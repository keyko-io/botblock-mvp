/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  BotblockMarket,
  BotblockMarketInterface,
} from "../../contracts/BotblockMarket";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
    ],
    name: "NVMNFTCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "OrderEvaded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
    ],
    name: "OrderPlaced",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "planID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "contentCreator",
        type: "address",
      },
    ],
    name: "PlanCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "paymentTokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expirationBlock",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    name: "createPlan",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "evadeActiveOrders",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
    ],
    name: "evadeOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllOrders",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "buyer",
            type: "address",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "planID",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "contentCreator",
                type: "address",
              },
              {
                internalType: "address",
                name: "paymentTokenAddress",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "price",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "expirationBlock",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "uri",
                type: "string",
              },
            ],
            internalType: "struct BotblockMarket.Plan",
            name: "plan",
            type: "tuple",
          },
          {
            internalType: "enum BotblockMarket.OrderStatus",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "orderId",
            type: "uint256",
          },
        ],
        internalType: "struct BotblockMarket.Order[]",
        name: "allOrders",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllPlans",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "planID",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "contentCreator",
            type: "address",
          },
          {
            internalType: "address",
            name: "paymentTokenAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "expirationBlock",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "uri",
            type: "string",
          },
        ],
        internalType: "struct BotblockMarket.Plan[]",
        name: "allPlans",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "neverminedNft721",
    outputs: [
      {
        internalType: "contract NvmNFT721",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "orderCount",
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
    name: "orders",
    outputs: [
      {
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "planID",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "contentCreator",
            type: "address",
          },
          {
            internalType: "address",
            name: "paymentTokenAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "expirationBlock",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "uri",
            type: "string",
          },
        ],
        internalType: "struct BotblockMarket.Plan",
        name: "plan",
        type: "tuple",
      },
      {
        internalType: "enum BotblockMarket.OrderStatus",
        name: "status",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "orderId",
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
        name: "planID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "placeOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "planCount",
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
    name: "plans",
    outputs: [
      {
        internalType: "uint256",
        name: "planID",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "contentCreator",
        type: "address",
      },
      {
        internalType: "address",
        name: "paymentTokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expirationBlock",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061001a336100ab565b30604051610027906100fb565b6001600160a01b039091168152602001604051809103906000f080158015610053573d6000803e3d6000fd5b50600180546001600160a01b0319166001600160a01b039290921691821790556040519081527f0f2f6e9f615995b0781e841e9c45d5bf86ec1e275140a2c86de28c15bb9e35729060200160405180910390a1610109565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6115e8806200198083390190565b61186780620001196000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c8063952233631161008c578063b162061611610066578063b1620616146101cd578063b54cb048146101f2578063d5086c0d14610205578063f2fde38b1461020d57600080fd5b8063952233631461018257806398de396a14610195578063a85c38ef146101aa57600080fd5b80637b23de81116100c85780637b23de811461011e5780637bea0d1c14610149578063843f61e21461015e5780638da5cb5b1461017157600080fd5b80632453ffa8146100ef578063382d39bb1461010b578063715018a614610114575b600080fd5b6100f860065481565b6040519081526020015b60405180910390f35b6100f860045481565b61011c610220565b005b600154610131906001600160a01b031681565b6040516001600160a01b039091168152602001610102565b610151610234565b6040516101029190611361565b61011c61016c366004611401565b610429565b6000546001600160a01b0316610131565b61011c610190366004611423565b610894565b61019d610ba8565b604051610102919061143c565b6101bd6101b8366004611423565b610d3d565b604051610102949392919061149e565b6101e06101db366004611423565b610e4d565b604051610102969594939291906114e0565b61011c61020036600461155e565b610f1a565b61011c611045565b61011c61021b366004611633565b6110cf565b610228611148565b61023260006111a2565b565b606060065467ffffffffffffffff81111561025157610251611548565b60405190808252806020026020018201604052801561028a57816020015b610277611207565b81526020019060019003908161026f5790505b50905060005b60065481101561042557600560006102a9836001611664565b8152602080820192909252604090810160002081516080808201845282546001600160a01b039081168352845160c081018652600185018054825260028601548316828901526003860154909216958101959095526004840154606086015260058401549185019190915260068301805492959394938601939260a08401919061033290611677565b80601f016020809104026020016040519081016040528092919081815260200182805461035e90611677565b80156103ab5780601f10610380576101008083540402835291602001916103ab565b820191906000526020600020905b81548152906001019060200180831161038e57829003601f168201915b505050919092525050508152600782015460209091019060ff1660018111156103d6576103d6611329565b60018111156103e7576103e7611329565b8152602001600882015481525050828281518110610407576104076116b1565b6020026020010181905250808061041d906116c7565b915050610290565b5090565b6000828152600360208181526040808420815160c0810183528154815260018201546001600160a01b03908116948201949094526002820154909316918301919091529182015460608201526004820154608082015260058201805491929160a08401919061049790611677565b80601f01602080910402602001604051908101604052809291908181526020018280546104c390611677565b80156105105780601f106104e557610100808354040283529160200191610510565b820191906000526020600020905b8154815290600101906020018083116104f357829003601f168201915b5050505050815250509050806060015182146105735760405162461bcd60e51b815260206004820152601860248201527f496e636f7272656374207061796d656e7420616d6f756e74000000000000000060448201526064015b60405180910390fd5b60408181015190516323b872dd60e01b8152336004820152306024820152604481018490526000906001600160a01b038316906323b872dd906064016020604051808303816000875af11580156105ce573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105f291906116e0565b9050806106515760405162461bcd60e51b815260206004820152602760248201527f74686520627579657220636f756c646e277420706179207468652073756273636044820152663934b83a34b7b760c91b606482015260840161056a565b6006546000906106629060016111f2565b604080516080808201835233825260008a815260036020818152858320865160c0810188528154815260018201546001600160a01b0390811682850152600283015416978101979097529182015460608701526004820154938601939093526005810180549697509195939492850193909160a08401916106e290611677565b80601f016020809104026020016040519081016040528092919081815260200182805461070e90611677565b801561075b5780601f106107305761010080835404028352916020019161075b565b820191906000526020600020905b81548152906001019060200180831161073e57829003601f168201915b505050919092525050508152602001600081526020018390526006549091506107859060016111f2565b6006818155600091825260056020818152604093849020855181546001600160a01b039182166001600160a01b03199182161783558388015180516001850190815594810151600285018054918516918416919091179055968701516003840180549190931691161790556060850151600482015560808501519281019290925560a08401518594929384019061081c9082611758565b505050604082015160078201805460ff19166001838181111561084157610841611329565b021790555060609190910151600890910155604080518381523360208201527f5222ba5f86a58ad15e7771bd95a809f162ae1762ea7cd66e28a58217341334cc910160405180910390a150505050505050565b600081815260056020526040812090600782015460ff1660018111156108bc576108bc611329565b146109095760405162461bcd60e51b815260206004820152601760248201527f4f7264657220697320616c726561647920657661646564000000000000000000604482015260640161056a565b60025460009061091a9060016111f2565b60038301546004808501546040516370a0823160e01b815230928101929092529293506001600160a01b03909116919082906370a0823190602401602060405180830381865afa158015610972573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109969190611818565b10156109db5760405162461bcd60e51b8152602060048201526014602482015273496e73756666696369656e742062616c616e636560601b604482015260640161056a565b600283015460048085015460405163a9059cbb60e01b81526001600160a01b0393841692810192909252602482015260009183169063a9059cbb906044016020604051808303816000875af1158015610a38573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a5c91906116e0565b905080610ac15760405162461bcd60e51b815260206004820152602d60248201527f74686520636f6e747261637420636f756c646e2774207061792074686520636f60448201526c373a32b73a1031b932b0ba37b960991b606482015260840161056a565b60015484546005860154604051630ab714fb60e11b81526001600160a01b03928316600482015260248101879052604481019190915291169063156e29f690606401600060405180830381600087803b158015610b1d57600080fd5b505af1158015610b31573d6000803e3d6000fd5b5050600254610b449250905060016111f2565b60025560078401805460ff191660011790558354604080518781526001600160a01b03909216602083015281018490527fb8a362e1c3231bc76ac0845f6bd0c60e1b9ab26e0e0a0f49058de1fb1423dcbe9060600160405180910390a15050505050565b606060045467ffffffffffffffff811115610bc557610bc5611548565b604051908082528060200260200182016040528015610bfe57816020015b610beb61123e565b815260200190600190039081610be35790505b50905060005b6004548110156104255760036000610c1d836001611664565b81526020808201929092526040908101600020815160c0810183528154815260018201546001600160a01b0390811694820194909452600282015490931691830191909152600381015460608301526004810154608083015260058101805460a084019190610c8b90611677565b80601f0160208091040260200160405190810160405280929190818152602001828054610cb790611677565b8015610d045780601f10610cd957610100808354040283529160200191610d04565b820191906000526020600020905b815481529060010190602001808311610ce757829003601f168201915b505050505081525050828281518110610d1f57610d1f6116b1565b60200260200101819052508080610d35906116c7565b915050610c04565b6005602081815260009283526040928390208054845160c081018652600183018054825260028401546001600160a01b0390811695830195909552600384015485169682019690965260048301546060820152938201546080850152600682018054939091169491939260a084019190610db690611677565b80601f0160208091040260200160405190810160405280929190818152602001828054610de290611677565b8015610e2f5780601f10610e0457610100808354040283529160200191610e2f565b820191906000526020600020905b815481529060010190602001808311610e1257829003601f168201915b505050919092525050506007820154600890920154909160ff169084565b600360208190526000918252604090912080546001820154600283015493830154600484015460058501805494966001600160a01b039485169694169492939192610e9790611677565b80601f0160208091040260200160405190810160405280929190818152602001828054610ec390611677565b8015610f105780601f10610ee557610100808354040283529160200191610f10565b820191906000526020600020905b815481529060010190602001808311610ef357829003601f168201915b5050505050905086565b600454600090610f2b9060016111f2565b905060006040518060c00160405280838152602001336001600160a01b03168152602001876001600160a01b03168152602001868152602001858152602001848152509050610f8660016004546111f290919063ffffffff16565b600481815560009182526003602081815260409384902085518155908501516001820180546001600160a01b03199081166001600160a01b03938416179091559486015160028301805490961691161790935560608401519083015560808301519082015560a082015182919060058201906110029082611758565b5050604080518481523360208201527f6b67a01eb500680a90226d64ad9239c6dc9c95b64ea6a8d9a3b5b94197b4658592500160405180910390a1505050505050565b600061104f610234565b905060015b81518110156110cb576000828281518110611071576110716116b1565b602002602001015160400151600181111561108e5761108e611329565b036110b9576110b98282815181106110a8576110a86116b1565b602002602001015160600151610894565b806110c3816116c7565b915050611054565b5050565b6110d7611148565b6001600160a01b03811661113c5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161056a565b611145816111a2565b50565b6000546001600160a01b031633146102325760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161056a565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60006111fe8284611664565b90505b92915050565b604051806080016040528060006001600160a01b0316815260200161122a61123e565b815260200160008152602001600081525090565b6040518060c001604052806000815260200160006001600160a01b0316815260200160006001600160a01b031681526020016000815260200160008152602001606081525090565b6000815180845260005b818110156112ac57602081850181015186830182015201611290565b506000602082860101526020601f19601f83011685010191505092915050565b805182526000602082015160018060a01b0380821660208601528060408501511660408601525050606082015160608401526080820151608084015260a082015160c060a085015261132160c0850182611286565b949350505050565b634e487b7160e01b600052602160045260246000fd5b6002811061135d57634e487b7160e01b600052602160045260246000fd5b9052565b60006020808301818452808551808352604092508286019150828160051b87010184880160005b838110156113f357888303603f19018552815180516001600160a01b03168452878101516080898601819052906113c1828701826112cc565b915050878201516113d48987018261133f565b5060609182015194909101939093529386019390860190600101611388565b509098975050505050505050565b6000806040838503121561141457600080fd5b50508035926020909101359150565b60006020828403121561143557600080fd5b5035919050565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b8281101561149157603f1988860301845261147f8583516112cc565b94509285019290850190600101611463565b5092979650505050505050565b6001600160a01b03851681526080602082018190526000906114c2908301866112cc565b90506114d1604083018561133f565b82606083015295945050505050565b8681526001600160a01b03868116602083015285166040820152606081018490526080810183905260c060a0820181905260009061152090830184611286565b98975050505050505050565b80356001600160a01b038116811461154357600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b6000806000806080858703121561157457600080fd5b61157d8561152c565b93506020850135925060408501359150606085013567ffffffffffffffff808211156115a857600080fd5b818701915087601f8301126115bc57600080fd5b8135818111156115ce576115ce611548565b604051601f8201601f19908116603f011681019083821181831017156115f6576115f6611548565b816040528281528a602084870101111561160f57600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b60006020828403121561164557600080fd5b6111fe8261152c565b634e487b7160e01b600052601160045260246000fd5b808201808211156112015761120161164e565b600181811c9082168061168b57607f821691505b6020821081036116ab57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052603260045260246000fd5b6000600182016116d9576116d961164e565b5060010190565b6000602082840312156116f257600080fd5b8151801515811461170257600080fd5b9392505050565b601f82111561175357600081815260208120601f850160051c810160208610156117305750805b601f850160051c820191505b8181101561174f5782815560010161173c565b5050505b505050565b815167ffffffffffffffff81111561177257611772611548565b611786816117808454611677565b84611709565b602080601f8311600181146117bb57600084156117a35750858301515b600019600386901b1c1916600185901b17855561174f565b600085815260208120601f198616915b828110156117ea578886015182559484019460019091019084016117cb565b50858210156118085787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60006020828403121561182a57600080fd5b505191905056fea26469706673582212206f9490dd80219c90110a856166e52affebf0d010eb1db93e9cfb08f8cf5d7cb564736f6c6343000811003360806040523480156200001157600080fd5b50604051620015e8380380620015e88339810160408190526200003491620000d3565b6040518060400160405280601d81526020017f4e4654373231537562736372697074696f6e5570677261646561626c6500000081525060405180604001604052806006815260200165272b26a9bab160d11b81525081600090816200009a9190620001aa565b506001620000a98282620001aa565b5050600780546001600160a01b0319166001600160a01b0393909316929092179091555062000276565b600060208284031215620000e657600080fd5b81516001600160a01b0381168114620000fe57600080fd5b9392505050565b634e487b7160e01b600052604160045260246000fd5b600181811c908216806200013057607f821691505b6020821081036200015157634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620001a557600081815260208120601f850160051c81016020861015620001805750805b601f850160051c820191505b81811015620001a1578281556001016200018c565b5050505b505050565b81516001600160401b03811115620001c657620001c662000105565b620001de81620001d784546200011b565b8462000157565b602080601f831160018114620002165760008415620001fd5750858301515b600019600386901b1c1916600185901b178555620001a1565b600085815260208120601f198616915b82811015620002475788860151825594840194600190910190840162000226565b5085821015620002665787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61136280620002866000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80636352211e1161008c578063a22cb46511610066578063a22cb465146101e1578063b88d4fde146101f4578063c87b56dd14610207578063e985e9c51461021a57600080fd5b80636352211e146101a557806370a08231146101b857806395d89b41146101d957600080fd5b8063095ea7b3116100c8578063095ea7b314610157578063156e29f61461016c57806323b872dd1461017f57806342842e0e1461019257600080fd5b806301ffc9a7146100ef57806306fdde0314610117578063081812fc1461012c575b600080fd5b6101026100fd366004610ebb565b610256565b60405190151581526020015b60405180910390f35b61011f6102a8565b60405161010e9190610f28565b61013f61013a366004610f3b565b61033a565b6040516001600160a01b03909116815260200161010e565b61016a610165366004610f70565b610361565b005b61016a61017a366004610f9a565b61047b565b61016a61018d366004610fcd565b6104fe565b61016a6101a0366004610fcd565b61052f565b61013f6101b3366004610f3b565b61054a565b6101cb6101c6366004611009565b6105aa565b60405190815260200161010e565b61011f610630565b61016a6101ef366004611024565b61063f565b61016a610202366004611076565b61064e565b61011f610215366004610f3b565b610686565b610102610228366004611152565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982166380ac58cd60e01b148061028757506001600160e01b03198216635b5e139f60e01b145b806102a257506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060600080546102b790611185565b80601f01602080910402602001604051908101604052809291908181526020018280546102e390611185565b80156103305780601f1061030557610100808354040283529160200191610330565b820191906000526020600020905b81548152906001019060200180831161031357829003601f168201915b5050505050905090565b6000610345826106fa565b506000908152600460205260409020546001600160a01b031690565b600061036c8261054a565b9050806001600160a01b0316836001600160a01b0316036103de5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b03821614806103fa57506103fa8133610228565b61046c5760405162461bcd60e51b815260206004820152603d60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c00000060648201526084016103d5565b610476838361075c565b505050565b6007546001600160a01b031633146104ef5760405162461bcd60e51b815260206004820152603160248201527f4f6e6c7920746865206d61726b6574706c616365206f776e65722063616e206360448201527030b636103a3434b990333ab731ba34b7b760791b60648201526084016103d5565b600681905561047683836107ca565b6105083382610955565b6105245760405162461bcd60e51b81526004016103d5906111bf565b6104768383836109d4565b6104768383836040518060200160405280600081525061064e565b6000818152600260205260408120546001600160a01b0316806102a25760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b60448201526064016103d5565b60006001600160a01b0382166106145760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b60648201526084016103d5565b506001600160a01b031660009081526003602052604090205490565b6060600180546102b790611185565b61064a338383610b38565b5050565b6106583383610955565b6106745760405162461bcd60e51b81526004016103d5906111bf565b61068084848484610c06565b50505050565b6060610691826106fa565b60006106a860408051602081019091526000815290565b905060008151116106c857604051806020016040528060008152506106f3565b806106d284610c39565b6040516020016106e392919061120c565b6040516020818303038152906040525b9392505050565b6000818152600260205260409020546001600160a01b03166107595760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b60448201526064016103d5565b50565b600081815260046020526040902080546001600160a01b0319166001600160a01b03841690811790915581906107918261054a565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6001600160a01b0382166108205760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016103d5565b6000818152600260205260409020546001600160a01b0316156108855760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016103d5565b6000818152600260205260409020546001600160a01b0316156108ea5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016103d5565b6001600160a01b038216600081815260036020908152604080832080546001019055848352600290915280822080546001600160a01b0319168417905551839291907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6000806109618361054a565b9050806001600160a01b0316846001600160a01b031614806109a857506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b806109cc5750836001600160a01b03166109c18461033a565b6001600160a01b0316145b949350505050565b826001600160a01b03166109e78261054a565b6001600160a01b031614610a0d5760405162461bcd60e51b81526004016103d59061123b565b6001600160a01b038216610a6f5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016103d5565b826001600160a01b0316610a828261054a565b6001600160a01b031614610aa85760405162461bcd60e51b81526004016103d59061123b565b600081815260046020908152604080832080546001600160a01b03199081169091556001600160a01b0387811680865260038552838620805460001901905590871680865283862080546001019055868652600290945282852080549092168417909155905184937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b816001600160a01b0316836001600160a01b031603610b995760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016103d5565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610c118484846109d4565b610c1d84848484610ccc565b6106805760405162461bcd60e51b81526004016103d590611280565b60606000610c4683610dcd565b600101905060008167ffffffffffffffff811115610c6657610c66611060565b6040519080825280601f01601f191660200182016040528015610c90576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a8504945084610c9a57509392505050565b60006001600160a01b0384163b15610dc257604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610d109033908990889088906004016112d2565b6020604051808303816000875af1925050508015610d4b575060408051601f3d908101601f19168201909252610d489181019061130f565b60015b610da8573d808015610d79576040519150601f19603f3d011682016040523d82523d6000602084013e610d7e565b606091505b508051600003610da05760405162461bcd60e51b81526004016103d590611280565b805181602001fd5b6001600160e01b031916630a85bd0160e11b1490506109cc565b506001949350505050565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8310610e0c5772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef81000000008310610e38576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc100008310610e5657662386f26fc10000830492506010015b6305f5e1008310610e6e576305f5e100830492506008015b6127108310610e8257612710830492506004015b60648310610e94576064830492506002015b600a83106102a25760010192915050565b6001600160e01b03198116811461075957600080fd5b600060208284031215610ecd57600080fd5b81356106f381610ea5565b60005b83811015610ef3578181015183820152602001610edb565b50506000910152565b60008151808452610f14816020860160208601610ed8565b601f01601f19169290920160200192915050565b6020815260006106f36020830184610efc565b600060208284031215610f4d57600080fd5b5035919050565b80356001600160a01b0381168114610f6b57600080fd5b919050565b60008060408385031215610f8357600080fd5b610f8c83610f54565b946020939093013593505050565b600080600060608486031215610faf57600080fd5b610fb884610f54565b95602085013595506040909401359392505050565b600080600060608486031215610fe257600080fd5b610feb84610f54565b9250610ff960208501610f54565b9150604084013590509250925092565b60006020828403121561101b57600080fd5b6106f382610f54565b6000806040838503121561103757600080fd5b61104083610f54565b91506020830135801515811461105557600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b6000806000806080858703121561108c57600080fd5b61109585610f54565b93506110a360208601610f54565b925060408501359150606085013567ffffffffffffffff808211156110c757600080fd5b818701915087601f8301126110db57600080fd5b8135818111156110ed576110ed611060565b604051601f8201601f19908116603f0116810190838211818310171561111557611115611060565b816040528281528a602084870101111561112e57600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b6000806040838503121561116557600080fd5b61116e83610f54565b915061117c60208401610f54565b90509250929050565b600181811c9082168061119957607f821691505b6020821081036111b957634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602d908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526c1c881bdc88185c1c1c9bdd9959609a1b606082015260800190565b6000835161121e818460208801610ed8565b835190830190611232818360208801610ed8565b01949350505050565b60208082526025908201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060408201526437bbb732b960d91b606082015260800190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061130590830184610efc565b9695505050505050565b60006020828403121561132157600080fd5b81516106f381610ea556fea264697066735822122035dd9654ee674b5f4db130e14879fe0f50fd37b4648f247d1420a6566dcfc4f164736f6c63430008110033";

type BotblockMarketConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BotblockMarketConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BotblockMarket__factory extends ContractFactory {
  constructor(...args: BotblockMarketConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<BotblockMarket> {
    return super.deploy(overrides || {}) as Promise<BotblockMarket>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): BotblockMarket {
    return super.attach(address) as BotblockMarket;
  }
  override connect(signer: Signer): BotblockMarket__factory {
    return super.connect(signer) as BotblockMarket__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BotblockMarketInterface {
    return new utils.Interface(_abi) as BotblockMarketInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BotblockMarket {
    return new Contract(address, _abi, signerOrProvider) as BotblockMarket;
  }
}
