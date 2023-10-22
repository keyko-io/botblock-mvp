import React from "react";
import { Plan, TokenAddress, tokenAddressMap } from "~~/context/Types";

const Recap = ({ plan }: { plan: Plan }) => {
  return (
    <div className="bg-white rounded-md shadow-md p-4 mb-4">
      <h2 className="text-2xl font-bold mb-4">Recap</h2>
      <ul className="list-disc pl-6">
        <li className="mb-2">{`Website ${plan.uri}`}</li>
        <li className="mb-2">{`Content Creator Address: ${plan.contentCreator}`}</li>
        <li className="mb-2">{`Duration: 3 Months`}</li>
        {/* <li className="mb-2">{`Duration: ${plan.expirationBlock}`}</li> */}
        <li className="mb-2">{`Token to receive upon subscription: ${plan.paymentTokenAddress}`}</li>
        <li className="mb-2">{`Price: ${plan.price} ${
          tokenAddressMap?.[plan.paymentTokenAddress as TokenAddress]
        }`}</li>
      </ul>
    </div>
  );
};

export default Recap;
