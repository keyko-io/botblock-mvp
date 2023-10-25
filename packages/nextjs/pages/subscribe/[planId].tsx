import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loader } from "~~/components/Loader";
import Recap from "~~/components/unlock/Recap";
import { Plan } from "~~/context/Types";
import { useWeb3AuthContext } from "~~/context/Web3AuthContext";

const SubscriptionDetails = () => {
  const router = useRouter();
  const [plan, setPlan] = useState<Plan>();
  const { getPlans, subsContract } = useWeb3AuthContext();

  const planId = router.query.planId as string;

  useEffect(() => {
    const setPlanIfExists = async () => {
      const plans = await getPlans();
      const foundPlan = plans?.find(plan => plan.planId === planId);

      if (foundPlan) {
        setPlan(foundPlan);
      }
    };

    if (subsContract && !plan && planId) {
      setPlanIfExists();
    }
  }, [plan, planId, getPlans, subsContract]);

  return plan ? (
    <div className="p-32 flex-grow" data-theme="exampleUi">
      <h1 className="text-4xl sm:text-6xl">Subscribe to planId: {planId}</h1>
      <h3 className="text-xl sm:text-2xl">Check out subscription details and purchase it!</h3>
      <Recap plan={plan} />
    </div>
  ) : (
    <Loader />
  );
};

export default SubscriptionDetails;
