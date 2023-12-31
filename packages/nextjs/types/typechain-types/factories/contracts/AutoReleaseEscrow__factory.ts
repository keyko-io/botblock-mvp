/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  AutoReleaseEscrow,
  AutoReleaseEscrowInterface,
} from "../../contracts/AutoReleaseEscrow";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_usdcToken",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "payer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "payee",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "EscrowCompleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "payer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "payee",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "EscrowCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_payee",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_duration",
        type: "uint256",
      },
    ],
    name: "createEscrow",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "escrowCount",
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
    name: "escrows",
    outputs: [
      {
        internalType: "address",
        name: "payer",
        type: "address",
      },
      {
        internalType: "address",
        name: "payee",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expirationTime",
        type: "uint256",
      },
      {
        internalType: "enum AutoReleaseEscrow.EscrowState",
        name: "state",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getContractBalance",
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
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_escrowId",
        type: "uint256",
      },
    ],
    name: "releaseEscrow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "usdcToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161091838038061091883398101604081905261002f91610062565b60008054336001600160a01b031991821617909155600180549091166001600160a01b0392909216919091179055610092565b60006020828403121561007457600080fd5b81516001600160a01b038116811461008b57600080fd5b9392505050565b610877806100a16000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80636f9fb98a1161005b5780636f9fb98a1461012b5780638da5cb5b14610133578063e2ecb31114610146578063ed6531641461015957600080fd5b8063012f52ee1461008257806311eac855146100e9578063675ac67a14610114575b600080fd5b6100cf6100903660046105f0565b6002602081905260009182526040909120805460018201549282015460038301546004909301546001600160a01b039283169490921692909160ff1685565b6040516100e095949392919061061f565b60405180910390f35b6001546100fc906001600160a01b031681565b6040516001600160a01b0390911681526020016100e0565b61011d60035481565b6040519081526020016100e0565b61011d61016e565b6000546100fc906001600160a01b031681565b61011d610154366004610673565b6101e0565b61016c6101673660046105f0565b610442565b005b6001546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a0823190602401602060405180830381865afa1580156101b7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101db91906106b4565b905090565b60008083116102365760405162461bcd60e51b815260206004820152601d60248201527f416d6f756e74206d7573742062652067726561746572207468616e203000000060448201526064015b60405180910390fd5b6006600061024582600a6107c9565b61024f90866107dc565b6001546040516323b872dd60e01b8152336004820152306024820152604481018390529192506001600160a01b0316906323b872dd906064016020604051808303816000875af11580156102a7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102cb91906107f3565b61030e5760405162461bcd60e51b81526020600482015260146024820152731554d110c81d1c985b9cd9995c8819985a5b195960621b604482015260640161022d565b600061031a8542610815565b60038054919250600061032c83610828565b90915550506040805160a0810182523381526001600160a01b0389811660208084019182528385018781526060850187815260016080870181815260038054600090815260029687905299909920885181549089166001600160a01b0319918216178255965181840180549190991697169690961790965591518484015551958301959095559151600482018054949592949193909260ff19909216919084908111156103db576103db610609565b021790555050600354604080519182523360208301526001600160a01b038a1690820152606081018490527f9405ad0a6208539879349284d71265479b1623846f70303da1f9890d6e8c10a7915060800160405180910390a1505060035495945050505050565b60008181526002602052604090206001600482015460ff16600281111561046b5761046b610609565b146104af5760405162461bcd60e51b8152602060048201526014602482015273457363726f77206973206e6f742061637469766560601b604482015260640161022d565b806003015442106105ec576001805490820154600283015460405163a9059cbb60e01b81526001600160a01b039283166004820152602481019190915291169063a9059cbb906044016020604051808303816000875af1158015610517573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061053b91906107f3565b61057e5760405162461bcd60e51b81526020600482015260146024820152731554d110c81d1c985b9cd9995c8819985a5b195960621b604482015260640161022d565b60048101805460ff191660029081179091558154600183015491830154604080518681526001600160a01b0393841660208201529290931682840152606082015290517f9dec7057567c230c9ad82c429f563876768f2ac36c936f3f31e3f03b4d5909219181900360800190a15b5050565b60006020828403121561060257600080fd5b5035919050565b634e487b7160e01b600052602160045260246000fd5b6001600160a01b03868116825285166020820152604081018490526060810183905260a081016003831061066357634e487b7160e01b600052602160045260246000fd5b8260808301529695505050505050565b60008060006060848603121561068857600080fd5b83356001600160a01b038116811461069f57600080fd5b95602085013595506040909401359392505050565b6000602082840312156106c657600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b600181815b8085111561071e578160001904821115610704576107046106cd565b8085161561071157918102915b93841c93908002906106e8565b509250929050565b600082610735575060016107c3565b81610742575060006107c3565b816001811461075857600281146107625761077e565b60019150506107c3565b60ff841115610773576107736106cd565b50506001821b6107c3565b5060208310610133831016604e8410600b84101617156107a1575081810a6107c3565b6107ab83836106e3565b80600019048211156107bf576107bf6106cd565b0290505b92915050565b60006107d58383610726565b9392505050565b80820281158282048414176107c3576107c36106cd565b60006020828403121561080557600080fd5b815180151581146107d557600080fd5b808201808211156107c3576107c36106cd565b60006001820161083a5761083a6106cd565b506001019056fea264697066735822122052e989c589bcb824cd1d438bbf848ea2a72e405d1b8e604e690453b1f6953a7864736f6c63430008110033";

type AutoReleaseEscrowConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AutoReleaseEscrowConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AutoReleaseEscrow__factory extends ContractFactory {
  constructor(...args: AutoReleaseEscrowConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _usdcToken: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<AutoReleaseEscrow> {
    return super.deploy(
      _usdcToken,
      overrides || {}
    ) as Promise<AutoReleaseEscrow>;
  }
  override getDeployTransaction(
    _usdcToken: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_usdcToken, overrides || {});
  }
  override attach(address: string): AutoReleaseEscrow {
    return super.attach(address) as AutoReleaseEscrow;
  }
  override connect(signer: Signer): AutoReleaseEscrow__factory {
    return super.connect(signer) as AutoReleaseEscrow__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AutoReleaseEscrowInterface {
    return new utils.Interface(_abi) as AutoReleaseEscrowInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AutoReleaseEscrow {
    return new Contract(address, _abi, signerOrProvider) as AutoReleaseEscrow;
  }
}
