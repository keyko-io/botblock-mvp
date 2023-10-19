import React from "react";
import { Plan } from "~~/context/Types";

const Recap = ({ plan }: { plan: Plan }) => {
  return (
    <div className="bg-white rounded-md shadow-md p-4 mb-4">
      <h2 className="text-2xl font-bold mb-4">Recap</h2>
      <ul className="list-disc pl-6">
        <li className="mb-2">{`Field 1: ${plan.contentCreator}`}</li>
        <li className="mb-2">{`Field 2: ${plan.expirationBlock}`}</li>
        <li className="mb-2">{`Field 3: ${plan.paymentTokenAddress}`}</li>
        <li className="mb-2">{`Field 4: ${plan.price}`}</li>
        <li className="mb-2">{`Field 4: ${plan.uri}`}</li>
      </ul>
    </div>
  );
};

export default Recap;
