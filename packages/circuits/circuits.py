from torch import nn
import torch
import ezkl
import os
import json
import logging
from typing import *

Field = int

# environment convigurations
model_path = os.path.join('network.onnx')
pk_path = os.path.join('test.pk')
vk_path = os.path.join('test.vk')
settings_path = os.path.join('settings.json')
srs_path = os.path.join('kzg.srs')

# instances
data_path = os.path.join('input.json')
witness_path = "witness.json"
proof_path = os.path.join('test.pf')

# evm deployment
abi_path = 'test.abi'
sol_code_path = 'test.sol'
address_path = os.path.join("address.json")

# TOMO is to modified

FORMAT = '%(levelname)s %(name)s %(asctime)-15s %(filename)s:%(lineno)d %(message)s'
logging.basicConfig(format=FORMAT)
logging.getLogger().setLevel(logging.DEBUG)

## Defining the circuit, TOMO
M = 1e9+7
n_model_input = 5

class Hasher(): 
    def hash2(self, x1, x2) -> Field:
        return x1//17*7 + x2//37*17
    
    def hash(self, x) -> Field:
        return self.hash2(x, 0)

    def hash_list(self, xs: List[Field]) -> Field:
        ans = 0
        for x in xs:
             ans = self.hash2(ans, x)
        return ans


class OpenNodeCircuit(nn.Module): 
    """
    this proofs: H(k, s, b1, b2, cModel, address) == cNode
    public input depends on use cases
    """
    def __init__(self):
        super(OpenNodeCircuit, self).__init__()
        self.hasher = Hasher()

    """
    x is of shape [-1, 7]
    """
    def forward(self, x):
        assert(len(x) == 7)
        return self.hasher.hash_list(x[:-1]) - x[-1] 

class MerkleProofCircuit(nn.Module):
    """
    gadget for proving merkle tree inclusion
    path[-1] is root, public
    """
    def __init__(self):
        super(MerkleProofCircuit, self).__init__()
        self.hasher = Hasher()

    def verify_merkle_proof(self, leaf: Field, index: Field, path: List[Field]):
        current_hash = leaf
        for sibling in path[:-1]:
            if index % 2 == 0:
                current_hash = self.hasher.hash2(current_hash, sibling)
            else:
                current_hash = self.hasher.hash2(sibling, current_hash)
            index = index // 2
        return current_hash - path[-1]

    def forward(self, x):
        leaf, index, *path = x # assume len(path) == height of the tree
        return self.verify_merkle_proof(leaf, index, path)

class DepositCircuit(nn.Module):
    def __init__(self):
        super(DepositCircuit, self).__init__()
        self.hasher = Hasher()
        self.openNode = OpenNodeCircuit()

    def forward(self, x):
        # pupblic: b1, b2, cModel, address
        return self.openNode(x)

class WithdrawCircuit(nn.Module):
    def __init__(self):
        super(WithdrawCircuit, self).__init__()
        self.hasher = Hasher()
        self.merkle = MerkleProofCircuit()

    def forward(self, x):
        k, s, b1, b2, cModel, addr, cNode, index, nullifier, *path = x
        y0 = self.merkle.verify_merkle_proof(cNode, index, path)
        y1 = self.hasher.hash(k) - nullifier
        # assume the output is 0
        # b1, b2, path[-1] is public, when ezkl support partial public input
        return [y0, y1] 

class FinalizeCircuit(nn.Module):
    def __init__(self):
        super(FinalizeCircuit, self).__init__()
        self.hasher = Hasher()
        self.merkle = MerkleProofCircuit()

    def forward(self, x):
        k, s, b1, b2, cModel, addr, cNode, index, nullifier, *y = x
        k2, s2, b12, b22, cNode2, delta1, delta2, *path = y
        y0 = self.merkle.verify_merkle_proof(cNode, index, path)
        y1 = self.hasher.hash(k) - nullifier
        y2 = b1-b12 - delta1
        y3 = b2-b22 - delta2
        # assume the output 0
        # public: delta1, delta2, nullifier (delta from nullifier)
        return [y0, y1, y2, y3]


class TradingModel(nn.Module): 
    def __init__(self):
        super(TradingModel, self).__init__()
        self.linear = nn.Linear(in_features=5, out_features=1)
    
    """
    x is in shape [batch, 5]
    """
    def forward(self, x):
        return self.linear(x)


# use hashed visibility
class TransactCircuit(nn.Module):
    def __init__(self):
        super(FinalizeCircuit, self).__init__()
        self.hasher = Hasher()
        self.model = TradingModel()
        self.merkle = MerkleProofCircuit()
        self.openNode = OpenNodeCircuit()

    def forward(self, x):
        k, s, b1, b2, cModel, addr, cNode, index, nullifier, b12, b22, *y = x
        model_input = y[:n_model_input]
        path = y[n_model_input]
        y0 = self.merkle.verify_merkle_proof(cNode, index, path)
        y1 = self.openNode([k, s, b1, b2, cModel, addr, cNode])
        y2 = self.hasher.hash(k) - nullifier
        model_output1, model_output2 = self.model(model_input)
        y3 = b1-b12 - model_output1
        y4 = b2-b22 - model_output2
        # assume the output 0
        # public: delta1, delta2, nullifier (delta from nullifier)
        return [y0, y1, y2, y3, y4]


def export_circuit(Model, x):
    circuit = Model()
    circuit.eval()
    torch.onnx.export(circuit,               # model being run
                        x,                   # model input (or a tuple for multiple inputs)
                        "network.onnx",            # where to save the model (can be a file or file-like object)
                        export_params=True,        # store the trained parameter weights inside the model file
                        opset_version=10,          # the ONNX version to export the model to
                        do_constant_folding=True,  # whether to execute constant folding for optimization
                        input_names = ['input'],   # the model's input names
                        output_names = ['output'], # the model's output names
                        dynamic_axes={'input' : {0 : 'batch_size'},    # variable length axes
                                        'output' : {0 : 'batch_size'}})

    data_array = ((x).detach().numpy()).reshape([-1]).tolist()
    data = dict(input_data = [data_array])
    json.dump( data, open("input.json", 'w' ))

def generate_settings(visibility_settings):
    run_args = ezkl.PyRunArgs()
    run_args.input_visibility, run_args.param_visibility, run_args.output_visibility = visibility_settings
    res = ezkl.gen_settings(model_path, settings_path, py_run_args=run_args)
    assert res == True

async def test_proof_and_verification(cal_data):
    cal_path = os.path.join('val_data.json')
    with open(cal_path, "w") as f:
        json.dump(cal_data, f)

    await ezkl.calibrate_settings(cal_path, model_path, settings_path, "resources")
    ezkl.get_srs(srs_path, settings_path)
    ezkl.gen_witness(data_path, model_path, witness_path, settings_path = settings_path)
    ezkl.mock(witness_path, model_path, settings_path)


def generate_keys():
    res = ezkl.setup(
            model_path,
            vk_path,
            pk_path,
            srs_path,
            settings_path,
        )
    assert res == True
    assert os.path.isfile(vk_path)
    assert os.path.isfile(pk_path)
    assert os.path.isfile(settings_path)


def prove():
    res = ezkl.prove(
            witness_path,
            model_path,
            pk_path,
            proof_path,
            srs_path,
            "evm",
            "single",
            settings_path,
        )
    print(res)

def verify():
    assert os.path.isfile(proof_path)
    res = ezkl.verify(
            proof_path,
            settings_path,
            vk_path,
            srs_path,
        )
    assert res == True
    print("verified")

def create_and_deploy_evm_verifier():
    res = ezkl.create_evm_verifier(
            vk_path,
            srs_path,
            settings_path,
            sol_code_path,
            abi_path,
        )
    assert res == True

    res = ezkl.deploy_evm(
        address_path,
        sol_code_path,
        'http://127.0.0.1:3030'
    )
    assert res == True

    with open(address_path, 'r') as file:
        addr = file.read().rstrip()
    return addr

def call_evm_verifier(addr):
    res = ezkl.verify_evm(
        proof_path,
        addr,
        "http://127.0.0.1:3030"
    )
    assert res == True

def main():
    # TOMO
    x = torch.asarray([1, 1, 1, 1, 1, 1, 6])
    visibility_settings = ["public", "hashed", "public"]
    cal_data = {
        "input_data": [(torch.asarray([1, 1, 1, 1, 1, 1, 6])).flatten().tolist()],
    }
    export_circuit(Model=DepositCircuit, x=x)
    
    generate_settings(visibility_settings=visibility_settings)
    test_proof_and_verification(cal_data=cal_data)
    generate_keys()
    prove()
    verify()
    addr = create_and_deploy_evm_verifier()
    call_evm_verifier(addr)

if __name__ == "__main__":
    main()