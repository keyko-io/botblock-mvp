import React from "react";
import TextBox from "./TextBox";
import { Plan, TokenAddress, tokenAddressMap } from "~~/context/Types";

interface PlanDetailsBoxProps {
  plan: Plan;
  title?: string;
}

const PlanDetailsBox = ({ plan, title }: PlanDetailsBoxProps) => {
  return (
    <TextBox title={title}>
      <ul className="list-disc pl-6">
        <li className="mb-2">{`Website ${plan.uri}`}</li>
        <li className="mb-2">{`Content Creator Address: ${plan.contentCreator}`}</li>
        <li className="mb-2">{`Duration: ${plan.expirationBlock} Month${
          Number(plan.expirationBlock) > 1 ? "s" : ""
        }`}</li>
        <li className="mb-2">{`Token to receive upon subscription: ${plan.paymentTokenAddress}`}</li>
        <li className="mb-2">{`Price: ${plan.price} ${
          tokenAddressMap?.[plan.paymentTokenAddress as TokenAddress]
        }`}</li>
      </ul>
    </TextBox>
  );
};

export default PlanDetailsBox;
