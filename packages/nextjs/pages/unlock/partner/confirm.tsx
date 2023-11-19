import toast from "react-hot-toast";
import PlanDetailsBox from "~~/components/PlanDetailsBox";
import { useWeb3AuthContext } from "~~/context/Web3AuthContext";
import { useNvmContext } from "~~/context/nvm/NvmContext";
import { Button } from "~~/ui";

const TITLE = "Confirm data and create a new plan";
const DESCRIPTION = "Have a last check to the plan. when clicking confirm, the plan will be listed on Botblock market.";

const Confirm = () => {
  const { plan } = useWeb3AuthContext();
  const { publishAsset, payload } = useNvmContext();

  /**
   * @dev handlePublishPlan uses nvm
   */
  const handlePublishPlan = async () => {
    try {
      const planId = await publishAsset(plan?.uri as string, plan?.price as string);
      toast.success(`Plan successfully published with id: ${planId}`);
    } catch (error) {
      console.log(error);
      toast.error("Ups, something went wrong. Please, try again later.");
    }
  };

  return (
    <div className="p-32 flex-grow" data-theme="exampleUi">
      <h1 className="text-4xl sm:text-6xl">{TITLE}</h1>
      <h3 className="text-xl sm:text-2xl">{DESCRIPTION}</h3>
      <div className="grid grid-cols-2 gap-4">{plan && <PlanDetailsBox title={"Recap"} plan={plan} />}</div>
      {payload ? (
        <Button onClick={handlePublishPlan}>{"Publish using NVM"}</Button>
      ) : (
        <p>Please connect the wallet to publish the asset</p>
      )}
    </div>
  );
};

export default Confirm;
