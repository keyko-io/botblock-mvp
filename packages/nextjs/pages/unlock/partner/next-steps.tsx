import { useEffect, useState } from "react";
import { BotBlockWidget } from "~~/components/BotBlockWidget/BotBlockWidget";
import { RainbowKitCustomConnectButton } from "~~/components/Header/components/RainbowKitCustomConnectButton";
import CodeSnippetButton from "~~/components/unlock/CodeSnippet";
import { Plan } from "~~/context/Types";
import { useWeb3AuthContext } from "~~/context/Web3AuthContext";

const TITLE = "Next Steps";
const STEP_ONE = "Check your email with the instructions to update the robots.txt";
const STEP_TWO = "Botblock will automatically check the update on your robots.txt and send you the subscription money";
const STEP_THREE = "Place the widget on your site to guide AI devs to Botblock for subscription purchases";
const WIDGET_EXPLANATION = "If used as it is shared, it will look and work as the one shown below";

const NextSteps = () => {
  const { address, email, getPlans, isConnected } = useWeb3AuthContext();
  const [latestPlanCreated, setLatestPlanCreated] = useState<Plan>();

  useEffect(() => {
    const getLatestPlanIdOfUser = async () => {
      const plans = await getPlans();
      setLatestPlanCreated(plans?.findLast(plan => plan.contentCreator === address));
    };

    getLatestPlanIdOfUser();
  }, [address, getPlans]);

  return (
    <div className="p-32 flex-grow" data-theme="exampleUi">
      <h1 className="text-4xl sm:text-6xl">
        {!isConnected
          ? "Please log in to see this page"
          : latestPlanCreated
          ? TITLE
          : "There are no plans created under this account"}
      </h1>
      {!isConnected ? (
        <RainbowKitCustomConnectButton />
      ) : latestPlanCreated ? (
        <>
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <span className="text-gray-600 font-bold px-3 border-r border-gray-600">Step 1</span>
              <h3 className="text-xl sm:text-2xl pl-3">{STEP_ONE}</h3>
            </div>

            <div className="font-bold  text-center">Your Email is {email}</div>
          </div>
          <br />
          <div className="flex items-center">
            <span className="text-gray-600 font-bold px-3 border-r border-gray-600">Step 2</span>
            <h3 className="text-xl sm:text-2xl pl-3">{STEP_TWO}</h3>
          </div>
          <br />
          <div className="flex items-center">
            <span className="text-gray-600 font-bold px-3 border-r border-gray-600">Step 3</span>
            <h3 className="text-xl sm:text-2xl pl-3">{STEP_THREE}</h3>
          </div>
          <br />

          <div className="col-span-2 md:col-span-1 flex items-center justify-center">
            <CodeSnippetButton planId={latestPlanCreated?.planID as string} />
          </div>

          <br />
          <div className="flex items-center">
            <h3 className="text-md sm:text-xl pl-3">{WIDGET_EXPLANATION}</h3>
          </div>
          <div className="flex justify-center py-8">
            <BotBlockWidget planId={latestPlanCreated?.planID as string} />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NextSteps;
