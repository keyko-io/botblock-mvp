import { expect } from "chai";
import { ethers } from "hardhat";
import { BotblockMarket, TestToken, NvmNFT721 } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const getTimestampOneMonthFromNow = (): number => {
  // Get the current date
  const currentDate = new Date();

  // Add one month to the current date
  currentDate.setMonth(currentDate.getMonth() + 1);

  // Get the timestamp for the new date
  const timestampOneMonthFromNow = currentDate.getTime();

  return timestampOneMonthFromNow;
};

describe("BotblockMarket", function () {
  // We define a fixture to reuse the same setup in every test.

  let botblockMarket: BotblockMarket;
  let testToken: TestToken;
  let nvm721Token: NvmNFT721;
  let marketOwner: SignerWithAddress;
  let contentCreator: SignerWithAddress;
  let subscriber: SignerWithAddress;
  let subscriber2: SignerWithAddress;

  before(async () => {
    [marketOwner, contentCreator, subscriber, subscriber2] = await ethers.getSigners();
    // [marketOwner, contentCreator, subscriber] = await ethers.getSigners();
    // deploy and mint TEST tokens
    const testTokenFactory = await ethers.getContractFactory("TestToken");
    testToken = (await testTokenFactory.deploy()) as TestToken;
    await testToken.deployed();

    testToken.mint(subscriber.address, 1000000000);
    testToken.mint(subscriber2.address, 1000000000);

    const botblockMarketFactory = await ethers.getContractFactory("BotblockMarket");
    botblockMarket = (await botblockMarketFactory.deploy()) as BotblockMarket;
    await botblockMarket.deployed();

    const nvm721TokenFactory = await ethers.getContractFactory("NvmNFT721");
    nvm721Token = (await nvm721TokenFactory.deploy(botblockMarket.address)) as NvmNFT721;
    await nvm721Token.deployed();
  });

  it("Should deploy and check test tokens balance", async function () {
    expect(botblockMarket.address).to.be.not.null;
    const subscriberBalance = await testToken.getBalance(subscriber.address);
    expect(subscriberBalance).greaterThan(0);
  });

  it("ContentCreator should be able to create a plan", async function () {
    const ccBbMarketConnected = botblockMarket.connect(contentCreator);
    await ccBbMarketConnected.createPlan(
      testToken.address,
      1,
      getTimestampOneMonthFromNow(),
      "https://www.mipiacitu.io",
    );
    const plan = await botblockMarket.plans(1);
    // console.log("plan", plan);
    expect(plan.contentCreator).equals(contentCreator.address);
  });

  it("Suscriber can place an order", async function () {
    const subConnectedToken = testToken.connect(subscriber);
    const approveTx = await subConnectedToken.approve(botblockMarket.address, 10);
    await approveTx.wait();

    const subscriberBbMarketConnected = botblockMarket.connect(subscriber);
    await subscriberBbMarketConnected.placeOrder(1, 1);
    const order = await botblockMarket.orders(1);
    const marketBalance = await testToken.getBalance(botblockMarket.address);
    expect(order.plan.contentCreator).equals(contentCreator.address);
    expect(marketBalance).equals(1);
    expect(order.status).equals(0);
  });

  it("Order can be evaded", async function () {
    const marketOwnerBbMarketConnected = botblockMarket.connect(marketOwner);
    await marketOwnerBbMarketConnected.evadeOrder(1);

    const contentCreatorTestBalance = await testToken.balanceOf(contentCreator.address);
    const order = await botblockMarket.orders(1);

    expect(order.status).equals(1);
    expect(contentCreatorTestBalance).equals(1);
  });
  it("Suscriber2 can place another order", async function () {
    const marketBalanceNew = await testToken.getBalance(botblockMarket.address);
    expect(marketBalanceNew).equals(0);

    const subConnectedToken = testToken.connect(subscriber2);
    const approveTx = await subConnectedToken.approve(botblockMarket.address, 10);
    await approveTx.wait();

    const subscriberBbMarketConnected = botblockMarket.connect(subscriber2);
    await subscriberBbMarketConnected.placeOrder(1, 1);
    const order = await botblockMarket.orders(2);
    const marketBalance = await testToken.getBalance(botblockMarket.address);

    expect(order.plan.contentCreator).equals(contentCreator.address);
    expect(order.status).equals(0);
    expect(marketBalance).equals(1);
  });

  it("second Order can be evaded", async function () {
    const marketOwnerBbMarketConnected = botblockMarket.connect(marketOwner);
    await marketOwnerBbMarketConnected.evadeOrder(2);

    const contentCreatorTestBalance = await testToken.balanceOf(contentCreator.address);
    const order = await botblockMarket.orders(2);
    expect(order.status).equals(1);
    expect(contentCreatorTestBalance).equals(2);
  });

  it("Create a bunch of orders and evade them using evadeActiveOrders (this one is for Chainlink Upkeep)", async function () {
    // order 1
    const subConnectedToken1 = testToken.connect(subscriber);
    const approveTx1 = await subConnectedToken1.approve(botblockMarket.address, 10);
    await approveTx1.wait();

    const subscriberBbMarketConnected1 = botblockMarket.connect(subscriber);
    await subscriberBbMarketConnected1.placeOrder(1, 1);
    const order1 = await botblockMarket.orders(3);
    expect(order1.status).equals(0);

    // order 2
    const subConnectedToken2 = testToken.connect(subscriber2);
    const approveTx2 = await subConnectedToken2.approve(botblockMarket.address, 10);
    await approveTx2.wait();

    const subscriberBbMarketConnected2 = botblockMarket.connect(subscriber2);
    await subscriberBbMarketConnected2.placeOrder(1, 1);
    const order2 = await botblockMarket.orders(4);
    expect(order2.status).equals(0);
    
    await subscriberBbMarketConnected2.placeOrder(1, 1);
    const order3 = await botblockMarket.orders(5);
    expect(order3.status).equals(0);


    const marketOwnerBbMarketConnected = botblockMarket.connect(marketOwner);
    await marketOwnerBbMarketConnected.evadeActiveOrders();
    // console.log("evadeActiveOrdersResult",evadeActiveOrdersResult)

    const orderShouldBeEvaded1 = await botblockMarket.orders(3);
    const allOrders = await botblockMarket.getAllOrders();
    expect(orderShouldBeEvaded1.status).equals(1);

    console.log("allOrders", allOrders);
    const orderShouldBeEvaded2 = await botblockMarket.orders(4);
    console.log("orderCount",  await botblockMarket.orderCount());
    // console.log("orderShouldBeEvaded2", orderShouldBeEvaded2);
    expect(orderShouldBeEvaded2.status).equals(1);
    const orderShouldBeEvaded3 = await botblockMarket.orders(5);
    console.log("5th order", orderShouldBeEvaded3);
    expect(orderShouldBeEvaded3.status).equals(1);

    
  });
});
