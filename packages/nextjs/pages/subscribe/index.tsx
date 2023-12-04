import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Plan, TokenAddress, tokenAddressMap } from "~~/context/Types";
import { useBBContractReads } from "~~/hooks/Botblock";
import { ContractNames } from "~~/hooks/Botblock/hooksUtils";

const Subscribe = () => {
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>();
  const { allPlans } = useBBContractReads({ contractName: ContractNames.BOTBLOCK });

  useEffect(() => {
    if (allPlans) {
      setPlans(allPlans as Plan[]);
    }
  }, [allPlans]);

  const browseToSubscriptionDetails = (plan: Plan) => {
    if (plan.planID) {
      router.push("/subscribe/" + plan.planID);
    }
  };

  return (
    <div className="p-32 flex-grow" data-theme="exampleUi">
      <h1 className="text-4xl sm:text-6xl">Subscribe</h1>
      <h3 className="text-xl sm:text-2xl">Click on any website you want to purchase on the list below</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="container w-fit">
          <div className="bg-white shadow-md overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Website</th>
                  <th className="border p-2">Content creator address</th>
                  <th className="border p-2">Duration</th>
                  {/* Left just for debugging */}
                  {/* <th className="border p-2">Payment token</th> */}
                  <th className="border p-2">Price</th>
                  <th className="border p-2"></th>
                </tr>
              </thead>
              <tbody>
                {plans &&
                  plans.map((plan, index) => (
                    <tr key={index}>
                      <td className="border p-2 text-center">{plan.uri}</td>
                      <td className="border p-2 text-end">{plan.contentCreator}</td>
                      <td className="border p-2 text-center">
                        {plan.expirationBlock} Month{plan.expirationBlock !== "1" && "s"}
                      </td>
                      {/* <td className="border p-2">{plan.paymentTokenAddress}</td> */}
                      <td className="border p-2 text-end">
                        {plan.price} {tokenAddressMap[plan.paymentTokenAddress as TokenAddress]}
                      </td>
                      <td className="border p-2 text-center">
                        <button
                          className="btn btn-primary w-32 rounded-full capitalize font-normal font-white flex items-center transition-all tracking-widest"
                          onClick={() => browseToSubscriptionDetails(plan)}
                        >
                          More details
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
