import { Order, Plan } from "~~/context/Types";
import { BotblockMarket } from "~~/types/typechain-types";

export const parsePlanStruct = (plan: BotblockMarket.PlanStructOutput): Plan => ({
  contentCreator: plan.contentCreator,
  expirationBlock: plan.expirationBlock.toString(),
  planID: plan.planID.toString(),
  paymentTokenAddress: plan.paymentTokenAddress,
  price: plan.price.toString(),
  uri: plan.uri,
});

export const parseOrderStruct = (order: BotblockMarket.OrderStructOutput): Order => ({
  buyer: order.buyer,
  orderId: order.orderId.toString(),
  plan: parsePlanStruct(order.plan),
  status: order.status,
});

export const isValidURL = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};
