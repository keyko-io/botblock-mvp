// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./INvmNFT721.sol";


// Marketplace Contract
contract BotblockMarket is Ownable {
    using SafeMath for uint256;
    INvmNFT721 public neverminedNft721;

    uint256 tokenIds;

    enum OrderStatus {
        Open,
        Completed
    }

    struct Plan {
        uint256 planID;
        address contentCreator;
        address paymentTokenAddress;
        uint256 price;
        uint256 expirationBlock;
        string uri;
    }
    struct Order {
        address buyer;
        Plan plan;
        OrderStatus status;
    }

    mapping(uint256 => Plan) public plans;
    uint256 public planCount;
    mapping(uint256 => Order) public orders;
    uint256 public orderCount;

    event OrderPlaced(uint256 planId, address buyer);
    event PlanCreated(uint256 planID, address contentCreator);
    event OrderEvaded(uint256 orderId, address buyer, uint256 tokenId);

    modifier onlyMarketplaceOwner() {
        require(
            msg.sender == owner(),
            "Only the marketplace owner can call this function"
        );
        _;
    }

    constructor(address _nftContract) Ownable(msg.sender) {
        neverminedNft721 = INvmNFT721(_nftContract);
    }

    function createPlan(
        address contentCreator,
        address paymentTokenAddress,
        uint256 price,
        uint256 expirationBlock,
        string memory uri
    ) public {
        uint256 planId = planCount.add(1);
        Plan memory plan = Plan(
            planId,
            contentCreator,
            paymentTokenAddress,
            price,
            expirationBlock,
            uri
        );
        planCount = planCount.add(1);
        plans[planCount] = plan;

        emit PlanCreated(planId, contentCreator);
    }

    function placeOrder(uint256 planId, uint256 amount) external payable {
        Plan memory plan = plans[planId];
        require(amount == plan.price, "Incorrect payment amount");
        
        IERC20 paymentToken = IERC20(plan.paymentTokenAddress);
        bool paymentSuccess = paymentToken.transferFrom(msg.sender, address(this), amount);
        require(paymentSuccess, "the buyer couldn't pay the subscription");


        Order memory order = Order(msg.sender, plans[planId], OrderStatus.Open);

        orderCount = orderCount.add(1);
        orders[orderCount] = order;

        emit OrderPlaced(planId, msg.sender);
    }

    function evadeOrder(uint256 orderId) external onlyMarketplaceOwner {
        Order memory order = orders[orderId];
        uint256 tokenId = tokenIds.add(1);

        IERC20 paymentToken = IERC20(order.plan.paymentTokenAddress);
        bool paymentSuccess = paymentToken.transferFrom(msg.sender, address(this), order.plan.price);
        require(paymentSuccess, "the contract couldn't pay the content creator");

        neverminedNft721.mint(order.buyer, tokenId, order.plan.expirationBlock);
        neverminedNft721.setNFTMetadata(tokenId,order.plan.uri);

        tokenIds = tokenIds.add(1);

        emit OrderEvaded(orderId, order.buyer, tokenId);
    }
}
