import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { Button } from "~~/components/Button";
import { Loader } from "~~/components/Loader";
import PlanDetailsBox from "~~/components/PlanDetailsBox";
import { Plan } from "~~/context/Types";
import { useBBContractReads, useBBMulticall } from "~~/hooks/Botblock";
import { BBFunctions, ContractNames, ERC20Functions, UseBBContractWrite } from "~~/hooks/Botblock/hooksUtils";

const SubscriptionDetails = () => {
  const router = useRouter();
  const [isPlanLoading, setIsPlanLoading] = useState(true);
  const [plan, setPlan] = useState<Plan>();
  const { isConnected, address } = useAccount();
  const { allPlans } = useBBContractReads({ contractName: ContractNames.BOTBLOCK });
  const { makeCall } = useBBMulticall();
  //TODO manage errors and stuff with isMulticallError..
  const handleApproveAndSendTx = async () => {
  const approvalAmount = ethers.utils.parseEther("100");

    const arr: UseBBContractWrite[] = [
      {
        contractName: ContractNames.KIT,
        functionName: ERC20Functions.APPROVE,
        args: [address, approvalAmount],
      },//THAT IS WORKING
      {
        contractName: ContractNames.BOTBLOCK,
        functionName: BBFunctions.PLACE_ORDER,
        args: [Number(plan?.planID), 1],
      },//THAT ONE IS GIVING ERRORS
    ];
    try {
      await makeCall(arr);
    } catch (error) {
      console.log("ERROR IN MCALL", error)
    }
  };

  const planID = router.query.planID as string;

  const redirectToSubscribeLanding = () => {
    router.push("/subscribe");
  };

  const browseToStatusPage = (orderId: string) => {
    router.push(`/subscribe/status/${orderId}`);
  };

  const handleOnPurchaseAttempt = () => {
    if (plan && plan.planID) {
      if (!isConnected) {
        toast.error("Please log in before submitting a purchase");
        return;
      }

      // Confirm the purchase attempt
      toast(
        t => (
          <div className={`w-60 rounded-lg pointer-events-auto flex`}>
            <div className="flex-1 w-0 p-4">
              <p className="text-lg text-black font-semibold">{"Do you want to confirm this purchase?"}</p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    toast.promise(handleApproveAndSendTx(), {
                      loading: "Wait some moments to complete the purchase!",
                      success: (
                        <div className="flex gap-4 flex-row">
                          <p className="font-medium">Successfully purchased</p>
                          <div className="flex border-l border-gray-200" />
                          <button
                            onClick={() => {
                              toast.dismiss(t.id);
                              browseToStatusPage(`${plan.planID}`);
                            }}
                            className="border border-transparent rounded-none rounded-r-lg flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                          >
                            See status
                          </button>
                        </div>
                      ),
                      error: "Oops! Something went wrong, please try again",
                    });
                  }}
                  className="bg-blue-500 text-white rounded-md py-2 px-4 m-2"
                >
                  Confirm
                </button>
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="bg-gray-300 text-gray-700 rounded-md py-2 px-4 m-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ),
        {
          duration: 10000, // Adjust the duration as needed
        },
      );
    }
  };

  useEffect(() => {
    const setPlanIfExists = async () => {
      // const plans = await getPlans();
      const foundPlan = allPlans?.find(plan => String(plan.planID) === planID);

      if (foundPlan) {
        setPlan(foundPlan);
      }
      setIsPlanLoading(false);
    };

    if (!plan && planID) {
      setPlanIfExists();
    }
  }, [plan, planID]);

  return (
    <div className="p-32 flex-grow" data-theme="exampleUi">
      {plan ? (
        <>
          <h1 className="text-4xl sm:text-6xl">Subscribe to: {plan.uri}</h1>
          <h3 className="text-xl sm:text-2xl">Check out subscription details and purchase it!</h3>
          <PlanDetailsBox plan={plan} />
          <Button
            disabled={!isConnected}
            title={isConnected ? "Buy access" : "Log in to purchase"}
            isLoading={isPlanLoading}
            onClick={handleOnPurchaseAttempt}
          />
        </>
      ) : isPlanLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-4xl sm:text-6xl mb-16">{`Oops! Looks like this sub' plan does not exists`}</h1>
          <Button title={"Click here to see available plans"} onClick={redirectToSubscribeLanding} />
        </>
      )}
    </div>
  );
};

export default SubscriptionDetails;
