import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loader } from "~~/components/Loader";
import Recap from "~~/components/unlock/Recap";
import { Plan, TokenAddress } from "~~/context/Types";

const samplePlan: Plan = {
  contentCreator: "0x12345678abcdef",
  expirationBlock: "1",
  paymentTokenAddress: TokenAddress.USDT,
  price: 10,
  uri: "https://www.sample.io",
};

const SubscriptionDetails = () => {
  const router = useRouter();
  const [plan, setPlan] = useState<Plan>();

  const planId = router.query.planId as string;

  useEffect(() => {
    setPlan(samplePlan);
  }, [router]);

  return plan ? (
    <div className="p-32 flex-grow" data-theme="exampleUi">
      <h1 className="text-4xl sm:text-6xl">Subscribe to planId: {planId}</h1>
      <h3 className="text-xl sm:text-2xl">Check out subscription details and purchase it!</h3>
      <Recap plan={{ ...samplePlan, planId }} />
    </div>
  ) : (
    <Loader />
  );
};

export default SubscriptionDetails;
