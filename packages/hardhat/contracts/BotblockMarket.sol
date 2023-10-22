// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./INvmNFT721.sol";
import "./NvmNFT721.sol";

// Marketplace Contract
contract BotblockMarket is Ownable {
    using SafeMath for uint256;
    NvmNFT721 public neverminedNft721;

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
        uint256 orderId;
    }

    mapping(uint256 => Plan) public plans;
    uint256 public planCount;

    mapping(uint256 => Order) public orders;
    uint256 public orderCount;

    event OrderPlaced(uint256 orderId, address buyer);
    event PlanCreated(uint256 planID, address contentCreator);
    event OrderEvaded(uint256 orderId, address buyer, uint256 tokenId);
    event NVMNFTCreated(address nftAddress);

    modifier onlyMarketplaceOwner() {
        require(
            msg.sender == owner(),
            "Only the marketplace owner can call this function"
        );
        _;
    }

    constructor() {
        neverminedNft721 = new NvmNFT721(address(this));
        emit NVMNFTCreated(address(neverminedNft721));
    }

    function createPlan(
        address paymentTokenAddress,
        uint256 price,
        uint256 expirationBlock,
        string memory uri
    ) public {
        uint256 planId = planCount.add(1);
        Plan memory plan = Plan(
            planId,
            msg.sender,
            paymentTokenAddress,
            price,
            expirationBlock,
            uri
        );
        planCount = planCount.add(1);
        plans[planCount] = plan;

        emit PlanCreated(planId, msg.sender);
    }

    function placeOrder(uint256 planId, uint256 amount) public {
        Plan memory plan = plans[planId];
        require(amount == plan.price, "Incorrect payment amount");

        IERC20 paymentToken = IERC20(plan.paymentTokenAddress);
        bool paymentSuccess = paymentToken.transferFrom(
            msg.sender,
            address(this),
            amount
        );
        require(paymentSuccess, "the buyer couldn't pay the subscription");
        //KIT: 0x8337E43E0E25eeDFA47b403Bdfe3726b8C1BB59b
        //NFT721: 0x2D940ad21e20cC91F2185AFF89b84c9d9315dae1
        uint256 orderId = orderCount.add(1);

        Order memory order = Order(
            msg.sender,
            plans[planId],
            OrderStatus.Open,
            orderId
        );

        orderCount = orderCount.add(1);

        orders[orderCount] = order;

        emit OrderPlaced(orderId, msg.sender);
    }

    function evadeOrder(uint256 orderId) public {
        Order storage order = orders[orderId];
        require(order.status == OrderStatus.Open, "Order is already evaded");

        uint256 tokenId = tokenIds.add(1);

        IERC20 paymentToken = IERC20(order.plan.paymentTokenAddress);
        require(
            paymentToken.balanceOf(address(this)) >= order.plan.price,
            "Insufficient balance"
        );

        bool paymentSuccess = paymentToken.transfer(
            order.plan.contentCreator,
            order.plan.price
        );
        require(
            paymentSuccess,
            "the contract couldn't pay the content creator"
        );

        neverminedNft721.mint(order.buyer, tokenId, order.plan.expirationBlock);
        // neverminedNft721.setNFTMetadata(tokenId, order.plan.uri);

        tokenIds = tokenIds.add(1);
        order.status = OrderStatus.Completed;

        emit OrderEvaded(orderId, order.buyer, tokenId);
    }

    function evadeActiveOrders() public {
        Order[] memory allOrders = getAllOrders();

        for (uint256 i = 0; i < allOrders.length; i++) {
            if (allOrders[i].status == OrderStatus.Open) {
                evadeOrder(allOrders[i].orderId);
            }
        }
    }

    function getAllPlans() public view returns (Plan[] memory allPlans) {
        allPlans = new Plan[](planCount);
        for (uint256 i = 0; i < planCount; i++) {
            allPlans[i] = plans[i];
        }
        return allPlans;
    }

    function getAllOrders() public view returns (Order[] memory allOrders) {
        allOrders = new Order[](orderCount);
        for (uint256 i = 0; i < orderCount; i++) {
            allOrders[i] = orders[i];
        }
        return allOrders;
    }
}
