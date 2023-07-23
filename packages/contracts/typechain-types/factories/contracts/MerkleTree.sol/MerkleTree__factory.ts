/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  BigNumberish,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  MerkleTree,
  MerkleTreeInterface,
} from "../../../contracts/MerkleTree.sol/MerkleTree";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_levels",
        type: "uint32",
      },
      {
        internalType: "contract IHasher",
        name: "_hasher",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "FIELD_SIZE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ZERO_VALUE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "filledSubtrees",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IHasher",
        name: "_hasher",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_left",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_right",
        type: "bytes32",
      },
    ],
    name: "hashLeftRight",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "hasher",
    outputs: [
      {
        internalType: "contract IHasher",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "levels",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextIndex",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "root",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "i",
        type: "uint256",
      },
    ],
    name: "zeros",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a06040526000600360006101000a81548163ffffffff021916908363ffffffff1602179055503480156200003357600080fd5b5060405162001c2238038062001c2283398181016040528101906200005991906200097b565b60008263ffffffff1611620000a5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200009c9062000a49565b60405180910390fd5b60208263ffffffff1610620000f1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620000e89062000abb565b60405180910390fd5b816000806101000a81548163ffffffff021916908363ffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff168152505060005b8263ffffffff168163ffffffff161015620001a757620001748163ffffffff16620001db60201b60201c565b600160008363ffffffff1681526020019081526020016000208190555080806200019e9062000b0c565b91505062000148565b50620001cd600183620001bb919062000b3d565b63ffffffff16620001db60201b60201c565b600281905550505062000bee565b600080820362000211577f2fe54c60d3acabf3343a35b6eba15db4821b340f76e741e2249685ed4899af6c60001b9050620008b7565b6001820362000246577f256a6135777eee2fd26f54b8b7037a25439d5235caee224154186d2b8a52e31d60001b9050620008b7565b600282036200027b577f1151949895e82ab19924de92c40a3d6f7bcb60d92b00504b8199613683f0c20060001b9050620008b7565b60038203620002b0577f20121ee811489ff8d61f09fb89e313f14959a0f28bb428a20dba6b0b068b3bdb60001b9050620008b7565b60048203620002e5577f0a89ca6ffa14cc462cfedb842c30ed221a50a3d6bf022a6a57dc82ab24c157c960001b9050620008b7565b600582036200031a577f24ca05c2b5cd42e890d6be94c68d0689f4f21c9cec9c0f13fe41d566dfb5495960001b9050620008b7565b600682036200034f577f1ccb97c932565a92c60156bdba2d08f3bf1377464e025cee765679e604a7315c60001b9050620008b7565b6007820362000384577f19156fbd7d1a8bf5cba8909367de1b624534ebab4f0f79e003bccdd1b182bdb460001b9050620008b7565b60088203620003b9577f261af8c1f0912e465744641409f622d466c3920ac6e5ff37e36604cb11dfff8060001b9050620008b7565b60098203620003ed577e58459724ff6ca5a1652fcbc3e82b93895cf08e975b19beab3f54c217d1c00760001b9050620008b7565b600a820362000422577f1f04ef20dee48d39984d8eabe768a70eafa6310ad20849d4573c3c40c2ad1e3060001b9050620008b7565b600b820362000457577f1bea3dec5dab51567ce7e200a30f7ba6d4276aeaa53e2686f962a46c66d511e560001b9050620008b7565b600c82036200048c577f0ee0f941e2da4b9e31c3ca97a40d8fa9ce68d97c084177071b3cb46cd3372f0f60001b9050620008b7565b600d8203620004c1577f1ca9503e8935884501bbaf20be14eb4c46b89772c97b96e3b2ebf3a36a948bbd60001b9050620008b7565b600e8203620004f6577f133a80e30697cd55d8f7d4b0965b7be24057ba5dc3da898ee2187232446cb10860001b9050620008b7565b600f82036200052b577f13e6d8fc88839ed76e182c2a779af5b2c0da9dd18c90427a644f7e148a6253b660001b9050620008b7565b6010820362000560577f1eb16b057a477f4bc8f572ea6bee39561098f78f15bfb3699dcbb7bd8db6185460001b9050620008b7565b6011820362000595577f0da2cb16a1ceaabf1c16b838f7a9e3f2a3a3088d9e0a6debaa748114620696ea60001b9050620008b7565b60128203620005ca577f24a3b3d822420b14b5d8cb6c28a574f01e98ea9e940551d2ebd75cee12649f9d60001b9050620008b7565b60138203620005ff577f198622acbd783d1b0d9064105b1fc8e4d8889de95c4c519b3f635809fe6afc0560001b9050620008b7565b6014820362000634577f29d7ed391256ccc3ea596c86e933b89ff339d25ea8ddced975ae2fe30b5296d460001b9050620008b7565b6015820362000669577f19be59f2f0413ce78c0c3703a3a5451b1d7f39629fa33abd11548a76065b296760001b9050620008b7565b601682036200069e577f1ff3f61797e538b70e619310d33f2a063e7eb59104e112e95738da1254dc345360001b9050620008b7565b60178203620006d3577f10c16ae9959cf8358980d9dd9616e48228737310a10e2b6b731c1a548f036c4860001b9050620008b7565b6018820362000708577f0ba433a63174a90ac20992e75e3095496812b652685b5e1a2eae0b1bf4e8fcd160001b9050620008b7565b601982036200073d577f019ddb9df2bc98d987d0dfeca9d2b643deafab8f7036562e627c3667266a044c60001b9050620008b7565b601a820362000772577f2d3c88b23175c5a5565db928414c66d1912b11acf974b2e644caaac04739ce9960001b9050620008b7565b601b8203620007a7577f2eab55f6ae4e66e32c5189eed5c470840863445760f5ed7e7b69b2a62600f35460001b9050620008b7565b601c8203620007db577e2df37a2642621802383cf952bf4dd1f32e05433beeb1fd41031fb7eace979d60001b9050620008b7565b601d820362000810577f104aeb41435db66c3e62feccc1d6f5d98d0a0ed75d1374db457cf462e3a1f42760001b9050620008b7565b601e820362000845577f1f3c6fd858e9a7d4b0d1f38e256a09d81d5a5e3c963987e2d4b814cfab7c6ebb60001b9050620008b7565b601f82036200087a577f2c7a07d20dff79d01fecedc1134284a8d08436606c93693b67e333f671bf69cc60001b9050620008b7565b6040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620008ae9062000bcc565b60405180910390fd5b919050565b600080fd5b600063ffffffff82169050919050565b620008dc81620008c1565b8114620008e857600080fd5b50565b600081519050620008fc81620008d1565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200092f8262000902565b9050919050565b6000620009438262000922565b9050919050565b620009558162000936565b81146200096157600080fd5b50565b60008151905062000975816200094a565b92915050565b60008060408385031215620009955762000994620008bc565b5b6000620009a585828601620008eb565b9250506020620009b88582860162000964565b9150509250929050565b600082825260208201905092915050565b7f5f6c6576656c732073686f756c642062652067726561746572207468616e207a60008201527f65726f0000000000000000000000000000000000000000000000000000000000602082015250565b600062000a31602383620009c2565b915062000a3e82620009d3565b604082019050919050565b6000602082019050818103600083015262000a648162000a22565b9050919050565b7f5f6c6576656c732073686f756c64206265206c657373207468616e2033320000600082015250565b600062000aa3601e83620009c2565b915062000ab08262000a6b565b602082019050919050565b6000602082019050818103600083015262000ad68162000a94565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600062000b1982620008c1565b915063ffffffff820362000b325762000b3162000add565b5b600182019050919050565b600062000b4a82620008c1565b915062000b5783620008c1565b9250828203905063ffffffff81111562000b765762000b7562000add565b5b92915050565b7f496e646578206f7574206f6620626f756e647300000000000000000000000000600082015250565b600062000bb4601383620009c2565b915062000bc18262000b7c565b602082019050919050565b6000602082019050818103600083015262000be78162000ba5565b9050919050565b60805161101862000c0a6000396000610b0101526110186000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063ebf0c71711610066578063ebf0c71714610134578063ec73295914610152578063ed33639f14610170578063f178e47c1461018e578063fc7e9c6f146101be57610093565b8063414a37ba146100985780634ecf518b146100b65780638ea3099e146100d4578063e829558814610104575b600080fd5b6100a06101dc565b6040516100ad9190610b6a565b60405180910390f35b6100be610200565b6040516100cb9190610ba4565b60405180910390f35b6100ee60048036038101906100e99190610c6a565b610214565b6040516100fb9190610ccc565b60405180910390f35b61011e60048036038101906101199190610d13565b610436565b60405161012b9190610ccc565b60405180910390f35b61013c610ad5565b6040516101499190610ccc565b60405180910390f35b61015a610adb565b6040516101679190610b6a565b60405180910390f35b610178610aff565b6040516101859190610d9f565b60405180910390f35b6101a860048036038101906101a39190610d13565b610b23565b6040516101b59190610ccc565b60405180910390f35b6101c6610b3b565b6040516101d39190610ba4565b60405180910390f35b7f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f000000181565b60008054906101000a900463ffffffff1681565b60007f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f00000018360001c1061027b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161027290610e17565b60405180910390fd5b7f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f00000018260001c106102e0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102d790610ea9565b60405180910390fd5b60008360001c905060008573ffffffffffffffffffffffffffffffffffffffff1663f47d33b583836040518363ffffffff1660e01b8152600401610325929190610ec9565b6040805180830381865afa158015610341573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103659190610f07565b80925081935050507f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f00000018061039c5761039b610f47565b5b8460001c830891508573ffffffffffffffffffffffffffffffffffffffff1663f47d33b583836040518363ffffffff1660e01b81526004016103df929190610ec9565b6040805180830381865afa1580156103fb573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061041f9190610f07565b80925081935050508160001b925050509392505050565b600080820361046a577f2fe54c60d3acabf3343a35b6eba15db4821b340f76e741e2249685ed4899af6c60001b9050610ad0565b6001820361049d577f256a6135777eee2fd26f54b8b7037a25439d5235caee224154186d2b8a52e31d60001b9050610ad0565b600282036104d0577f1151949895e82ab19924de92c40a3d6f7bcb60d92b00504b8199613683f0c20060001b9050610ad0565b60038203610503577f20121ee811489ff8d61f09fb89e313f14959a0f28bb428a20dba6b0b068b3bdb60001b9050610ad0565b60048203610536577f0a89ca6ffa14cc462cfedb842c30ed221a50a3d6bf022a6a57dc82ab24c157c960001b9050610ad0565b60058203610569577f24ca05c2b5cd42e890d6be94c68d0689f4f21c9cec9c0f13fe41d566dfb5495960001b9050610ad0565b6006820361059c577f1ccb97c932565a92c60156bdba2d08f3bf1377464e025cee765679e604a7315c60001b9050610ad0565b600782036105cf577f19156fbd7d1a8bf5cba8909367de1b624534ebab4f0f79e003bccdd1b182bdb460001b9050610ad0565b60088203610602577f261af8c1f0912e465744641409f622d466c3920ac6e5ff37e36604cb11dfff8060001b9050610ad0565b60098203610634577e58459724ff6ca5a1652fcbc3e82b93895cf08e975b19beab3f54c217d1c00760001b9050610ad0565b600a8203610667577f1f04ef20dee48d39984d8eabe768a70eafa6310ad20849d4573c3c40c2ad1e3060001b9050610ad0565b600b820361069a577f1bea3dec5dab51567ce7e200a30f7ba6d4276aeaa53e2686f962a46c66d511e560001b9050610ad0565b600c82036106cd577f0ee0f941e2da4b9e31c3ca97a40d8fa9ce68d97c084177071b3cb46cd3372f0f60001b9050610ad0565b600d8203610700577f1ca9503e8935884501bbaf20be14eb4c46b89772c97b96e3b2ebf3a36a948bbd60001b9050610ad0565b600e8203610733577f133a80e30697cd55d8f7d4b0965b7be24057ba5dc3da898ee2187232446cb10860001b9050610ad0565b600f8203610766577f13e6d8fc88839ed76e182c2a779af5b2c0da9dd18c90427a644f7e148a6253b660001b9050610ad0565b60108203610799577f1eb16b057a477f4bc8f572ea6bee39561098f78f15bfb3699dcbb7bd8db6185460001b9050610ad0565b601182036107cc577f0da2cb16a1ceaabf1c16b838f7a9e3f2a3a3088d9e0a6debaa748114620696ea60001b9050610ad0565b601282036107ff577f24a3b3d822420b14b5d8cb6c28a574f01e98ea9e940551d2ebd75cee12649f9d60001b9050610ad0565b60138203610832577f198622acbd783d1b0d9064105b1fc8e4d8889de95c4c519b3f635809fe6afc0560001b9050610ad0565b60148203610865577f29d7ed391256ccc3ea596c86e933b89ff339d25ea8ddced975ae2fe30b5296d460001b9050610ad0565b60158203610898577f19be59f2f0413ce78c0c3703a3a5451b1d7f39629fa33abd11548a76065b296760001b9050610ad0565b601682036108cb577f1ff3f61797e538b70e619310d33f2a063e7eb59104e112e95738da1254dc345360001b9050610ad0565b601782036108fe577f10c16ae9959cf8358980d9dd9616e48228737310a10e2b6b731c1a548f036c4860001b9050610ad0565b60188203610931577f0ba433a63174a90ac20992e75e3095496812b652685b5e1a2eae0b1bf4e8fcd160001b9050610ad0565b60198203610964577f019ddb9df2bc98d987d0dfeca9d2b643deafab8f7036562e627c3667266a044c60001b9050610ad0565b601a8203610997577f2d3c88b23175c5a5565db928414c66d1912b11acf974b2e644caaac04739ce9960001b9050610ad0565b601b82036109ca577f2eab55f6ae4e66e32c5189eed5c470840863445760f5ed7e7b69b2a62600f35460001b9050610ad0565b601c82036109fc577e2df37a2642621802383cf952bf4dd1f32e05433beeb1fd41031fb7eace979d60001b9050610ad0565b601d8203610a2f577f104aeb41435db66c3e62feccc1d6f5d98d0a0ed75d1374db457cf462e3a1f42760001b9050610ad0565b601e8203610a62577f1f3c6fd858e9a7d4b0d1f38e256a09d81d5a5e3c963987e2d4b814cfab7c6ebb60001b9050610ad0565b601f8203610a95577f2c7a07d20dff79d01fecedc1134284a8d08436606c93693b67e333f671bf69cc60001b9050610ad0565b6040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ac790610fc2565b60405180910390fd5b919050565b60025481565b7f2fe54c60d3acabf3343a35b6eba15db4821b340f76e741e2249685ed4899af6c81565b7f000000000000000000000000000000000000000000000000000000000000000081565b60016020528060005260406000206000915090505481565b600360009054906101000a900463ffffffff1681565b6000819050919050565b610b6481610b51565b82525050565b6000602082019050610b7f6000830184610b5b565b92915050565b600063ffffffff82169050919050565b610b9e81610b85565b82525050565b6000602082019050610bb96000830184610b95565b92915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610bef82610bc4565b9050919050565b6000610c0182610be4565b9050919050565b610c1181610bf6565b8114610c1c57600080fd5b50565b600081359050610c2e81610c08565b92915050565b6000819050919050565b610c4781610c34565b8114610c5257600080fd5b50565b600081359050610c6481610c3e565b92915050565b600080600060608486031215610c8357610c82610bbf565b5b6000610c9186828701610c1f565b9350506020610ca286828701610c55565b9250506040610cb386828701610c55565b9150509250925092565b610cc681610c34565b82525050565b6000602082019050610ce16000830184610cbd565b92915050565b610cf081610b51565b8114610cfb57600080fd5b50565b600081359050610d0d81610ce7565b92915050565b600060208284031215610d2957610d28610bbf565b5b6000610d3784828501610cfe565b91505092915050565b6000819050919050565b6000610d65610d60610d5b84610bc4565b610d40565b610bc4565b9050919050565b6000610d7782610d4a565b9050919050565b6000610d8982610d6c565b9050919050565b610d9981610d7e565b82525050565b6000602082019050610db46000830184610d90565b92915050565b600082825260208201905092915050565b7f5f6c6566742073686f756c6420626520696e7369646520746865206669656c64600082015250565b6000610e01602083610dba565b9150610e0c82610dcb565b602082019050919050565b60006020820190508181036000830152610e3081610df4565b9050919050565b7f5f72696768742073686f756c6420626520696e7369646520746865206669656c60008201527f6400000000000000000000000000000000000000000000000000000000000000602082015250565b6000610e93602183610dba565b9150610e9e82610e37565b604082019050919050565b60006020820190508181036000830152610ec281610e86565b9050919050565b6000604082019050610ede6000830185610b5b565b610eeb6020830184610b5b565b9392505050565b600081519050610f0181610ce7565b92915050565b60008060408385031215610f1e57610f1d610bbf565b5b6000610f2c85828601610ef2565b9250506020610f3d85828601610ef2565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f496e646578206f7574206f6620626f756e647300000000000000000000000000600082015250565b6000610fac601383610dba565b9150610fb782610f76565b602082019050919050565b60006020820190508181036000830152610fdb81610f9f565b905091905056fea2646970667358221220bdd2c751af657ada721b82ebdf399567ecf705ec4659f893ce3db5979661d4a364736f6c63430008110033";

type MerkleTreeConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MerkleTreeConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MerkleTree__factory extends ContractFactory {
  constructor(...args: MerkleTreeConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _levels: BigNumberish,
    _hasher: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(_levels, _hasher, overrides || {});
  }
  override deploy(
    _levels: BigNumberish,
    _hasher: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(_levels, _hasher, overrides || {}) as Promise<
      MerkleTree & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): MerkleTree__factory {
    return super.connect(runner) as MerkleTree__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MerkleTreeInterface {
    return new Interface(_abi) as MerkleTreeInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): MerkleTree {
    return new Contract(address, _abi, runner) as unknown as MerkleTree;
  }
}