import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "~~/components/Button";
import { RainbowKitCustomConnectButton } from "~~/components/Header/components/RainbowKitCustomConnectButton";
import { Loader } from "~~/components/Loader";
import { Order, Plan } from "~~/context/Types";
import { useWeb3AuthContext } from "~~/context/Web3AuthContext";

const statusMessages = [
  "Success! Site is up and ready for crawling",
  "Waiting... Payment has been submitted and it is awaiting site's robots.txt update to credit. N days left until returning funds to purchaser wallet",
  "Expired: Please renew your subscription to keep scrapping the site",
];

const StatusPage = () => {
  const { address, getOrders, getPlans, isConnected, subsContract } = useWeb3AuthContext();
  const [plan, setPlan] = useState<Plan>();
  const [order, setOrder] = useState<Order>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const planID = router.query.planID as string;

  const redirectToSubscribeLanding = () => {
    router.push("/subscribe");
  };

  const browseToSubscriptionDetails = () => {
    router.push(`/subscribe/${plan?.planID}`);
  };

  useEffect(() => {
    const checkUserOrdersForMatch = async () => {
      const orders = await getOrders();
      const foundOrder = orders?.find(order => order.buyer === address && order.plan.planID === planID);
      if (foundOrder) {
        setOrder(foundOrder);
      }
      setIsLoading(false);
    };

    if (subsContract && address) {
      checkUserOrdersForMatch();
    }
  }, [address, getOrders, planID, subsContract]);

  useEffect(() => {
    const setPlanIfExists = async () => {
      const plans = await getPlans();
      const foundPlan = plans?.find(plan => plan.planID === planID);

      if (foundPlan) {
        setPlan(foundPlan);
      }
    };

    if (subsContract && !plan && planID) {
      setPlanIfExists();
    }
  }, [plan, planID, getPlans, subsContract]);

  return (
    <div className="p-32 flex-grow" data-theme="exampleUi">
      {order ? (
        <>
          <h1 className="text-4xl sm:text-6xl">Status page for {order.plan.uri}</h1>
          <h3 className="text-xl sm:text-2xl">{statusMessages[order.status]}</h3>
        </>
      ) : !isConnected ? (
        <>
          <h1 className="text-4xl sm:text-6xl mb-16">Please log in to access the status page</h1>
          <RainbowKitCustomConnectButton />
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
