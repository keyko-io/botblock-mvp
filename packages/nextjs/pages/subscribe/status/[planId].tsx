import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "~~/components/Button";
import { Loader } from "~~/components/Loader";
import PlanDetailsBox from "~~/components/PlanDetailsBox";
import { Order, Plan } from "~~/context/Types";
import { useWeb3AuthContext } from "~~/context/Web3AuthContext";

const StatusPage = () => {
  const { address, getOrders, getPlans, subsContract } = useWeb3AuthContext();
  const [plan, setPlan] = useState<Plan>();
  const [order, setOrder] = useState<Order>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const planId = router.query.planId as string;

  const redirectToSubscribeLanding = () => {
    router.push("/subscribe");
  };

  const browseToSubscriptionDetails = () => {
    router.push(`/subscribe/${plan?.planId}`);
  };

  useEffect(() => {
    const checkUserOrdersForMatch = async () => {
      const orders = await getOrders();
      const foundOrder = orders?.find(order => order.buyer === address && order.plan.planId === planId);
      if (foundOrder) {
        setOrder(foundOrder);
      }
      setIsLoading(false);
    };

    if (subsContract && address) {
      checkUserOrdersForMatch();
    }
  }, [address, getOrders, planId, subsContract]);

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
      {order ? (
        <>
          <h1 className="text-4xl sm:text-6xl">Status page for {order.plan.uri}</h1>
          <h3 className="text-xl sm:text-2xl">Details of your purchase</h3>
          <PlanDetailsBox plan={order.plan} />
        </>
      ) : isLoading ? (
        <Loader />
      ) : plan ? (
        <>
          <h1 className="text-4xl sm:text-6xl mb-16">
            Looks like you are looking for <i>{plan.uri}</i> subscription plan
          </h1>
          <Button title={"Click here to see more details about it"} onClick={browseToSubscriptionDetails} />
        </>
      ) : (
        <>
          <h1 className="text-4xl sm:text-6xl mb-16">{`Oops! Looks like this sub' plan does not exists`}</h1>
          <Button title={"Click here to see available plans"} onClick={redirectToSubscribeLanding} />
        </>
      )}
    </div>
  );
};

export default StatusPage;
