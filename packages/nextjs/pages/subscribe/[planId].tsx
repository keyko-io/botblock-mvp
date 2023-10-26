import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Button } from "~~/components/Button";
import { Loader } from "~~/components/Loader";
import PlanDetailsBox from "~~/components/PlanDetailsBox";
import { Plan } from "~~/context/Types";
import { useWeb3AuthContext } from "~~/context/Web3AuthContext";

const SubscriptionDetails = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [plan, setPlan] = useState<Plan>();
  const { getPlans, isConnected, purchasePlan, subsContract } = useWeb3AuthContext();

  const planId = router.query.planId as string;

  const redirectToSubscribeLanding = () => {
    router.push("/subscribe");
  };

  const handleOnPurchaseAttempt = (plan: Plan) => {
    if (plan.planId) {
      if (!isConnected) {
        toast.error("Please log in before submitting a purchase");
        return;
      }

      // @note: should ask before confirmation
      toast.promise(purchasePlan(plan.planId, Number(plan.price), plan.paymentTokenAddress), {
        loading: "Wait some moments to complete the purchase!",
        success: "Successfully purchased",
        error: "Oops! Something went wrong, please try again",
      });
    }
  };

  useEffect(() => {
    const setPlanIfExists = async () => {
      const plans = await getPlans();
      const foundPlan = plans?.find(plan => plan.planId === planId);

      if (foundPlan) {
        setPlan(foundPlan);
      }
      setIsLoading(false);
    };

    if (subsContract && !plan && planId) {
      setPlanIfExists();
    }
  }, [plan, planId, getPlans, subsContract]);

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
            isLoading={isLoading}
            onClick={() => handleOnPurchaseAttempt(plan)}
          />
        </>
      ) : isLoading ? (
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
