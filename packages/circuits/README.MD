# Relayer Circuits

## Project Overview
Preprocessing zk-SNARKs allow proving correct executions of a preprocessed circuit without revealing it. This allows parties to grant access to their innovative computation models without revealing them. However, the execution histories of computations can leak the information about the computations themselves. Thus, we also use a mixing relayer (similar to Tornado Cash) to reduce information leackage. 

## Tech stack
We use [ezkl](https://github.com/zkonduit/ezkl) to write circuits. The library allows algebraic circuits to be written in python (PyTorch modules to `.onnx` files to `halo2` circuits, with ~20 Einstein summations as basic operations). It also provides a solidity verifier out of the box. Speical thanks to [alexander-camuto](https://github.com/alexander-camuto) for actively answering the questions.

## Installation
```bash
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
./install.sh
```

## Relayer Overview
We use a merkle tree to handle resource nodes, which are commitments to relevant data. Traders prove ownership of resources by opening the resource nodes in the Merkle tree and the opening the resource nodes themselves. They also need to prove the transitions are done correctly.
- A resource node is a commitment to the following data
  - s (secret): to let an anomonous address to manipulate the resource
  - k (nullifier): to mark the status of the resource (transacted/nullified)
  - balance
  - cModel (commitment to a model): to ensure the trade decision is done by the committed model
  - address: to ensure the withdraw address is the same as the deposit address for legal compliance
- Interface
  - Since only the depositor can update the balance by inserting a new resource node and nullifying the traded one, the transaction need to be split into two operations: `transact` and `finalize`
  - `deposit`
    - The relayer receives the resource and inserts the resource node into the tree
  - `withdraw`
    - The relayer checks the resource node's balance, returns the resource, and marks the resource nullified
  - `transact`
    - The relayer checks the resource node's balance, checks the model did the decision, executes the trade, and marks the resource as traded. The trade result is stored and the resource is awaiting finalization.
  - `finalize`
    - The relayer checks the difference between the nodes then nullifys and inserts old and new nodes respectively.

## Circuits PseudoCodes
If you would like to know more about the details w/o diving into the actual circuits in `circuits.py`, here is a pseudocode for your reference.

```python
def deposit(cNode, cModel, _balance):
	# public inputs
	# _balance, cNode, cModel, address
	verify(lambda:
		cNode == H(k, s, balance, cModel, address)
		balance == _balance
	)
	_process_deposit(_balance)

def withdraw(proof, nullifier, withdrawData):
	# public inputs
	# treeRoot, nullifier, withdrawData, address
	verify(lambda:
		H(k, s, balance, cModel, address) = cNode in treeRoot
		nullifier = H(k)
		is_compatible_with(balance, withdrawData)
	)
	statusPool[nullifier] = status.Nullified
	_process_withdraw(withdrawData, address)

def transact(proof, nullifier, cModelInput, model_output):
	# public inputs
	# treeRoot, nullifier, cModulInput, model_output
	verify(lambda:
		H(k, s, balance, cModel, address) = cNode in treeRoot
		H(model_input) = cModelInput
		nullifier = H(k)
		cModel = H(model)
		model_output = model(model_input) # verifier circuit is required
		is_compatible_with(balance, model_output)
	)
	result = _process_transact(model_output)
	statusPool[nullifier] = status.Transacted
    transactionResult[nullifier] = result

def finalize(proof, nullifier, cNode2, tradeId):
	# public inputs
	# treeRoot, nullifier, cNode2
    result = transaction_result[nullifier]
	verify(lambda:
		cNode = H(k, s, balance, cModel, address) in treeRoot
		nullifier = H(k, "withdrew")
		cNode2 = H(k2, s2, balance2, cModel, address)
		balance = balance2 + result
	)
	_insert(cNode2)
	assert(statusPool[nullifier] = status.Transacted)
	statusPool[nullifier] = status.Nullified
```

## Limitations
Our pytorch modules (ezkl circuits) cannot be exported to onnx during the hackathon since the [tract](https://github.com/sonos/tract) library cannot inference the onnx output for our circuits. 
We are currently using a mock verifier contract to make proofs pass.
We plan to improve related libraries or [directly use Halo2](https://github.com/privacy-scaling-explorations/snark-verifier/tree/main/snark-verifier-sdk) circuits for the backend.