from torch import nn
import torch
import ezkl
import os
import json
import logging
from typing import *

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
Field = int


def hashLR(l: Field, r: Field) -> Field:
        return l+r

class MyModel(nn.Module):
    def __init__(self):
        super(MyModel, self).__init__()

    def verify_merkle_proof(self, leaf: Field, index: Field, merkle_path: List[Field]):
        current_hash = leaf
        for sibling in merkle_path:
            if index % 2 == 0:
                current_hash = hashLR(current_hash, sibling)
            else:
                current_hash = hashLR(sibling, current_hash)
            index = index // 2
        return current_hash - merkle_path[-1]

    def forward(self, x):
        leaf, index, *path = x # assume len(path) == height of the tree
        return self.verify_merkle_proof(leaf, index, path)

def export_circuit():
    circuit = MyModel()
    circuit.eval()
    # x = 0.1*torch.rand(1,*[3, 8, 8], requires_grad=True) # TOMO
    x = torch.asarray([1, 0, 1, 1])

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

def generate_settings():
    run_args = ezkl.PyRunArgs()
    run_args.input_visibility = "public"
    run_args.param_visibility = "hashed"
    run_args.output_visibility = "public"

    res = ezkl.gen_settings(model_path, settings_path, py_run_args=run_args)
    assert res == True

async def test_proof_and_verification():
    ## calibration data, TOMO
    cal_data = {
        "input_data": [(0.1*torch.rand(40, *[3, 8, 8])).flatten().tolist()],
    }
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
    export_circuit()
    generate_settings()
    test_proof_and_verification()
    generate_keys()
    prove()
    verify()
    addr = create_and_deploy_evm_verifier()
    call_evm_verifier(addr)

if __name__ == "__main__":
    main()