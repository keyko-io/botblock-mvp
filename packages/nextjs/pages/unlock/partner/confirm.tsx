import { useContractWrite } from "wagmi";
import { Button } from "~~/components/Button";
import { Loader } from "~~/components/Loader";
import PlanDetailsBox from "~~/components/PlanDetailsBox";
import { useWeb3AuthContext } from "~~/context/Web3AuthContext";
import * as BotBlockMarketArtifact from "~~/public/artifacts/BotblockMarket.json";
import { notification } from "~~/utils/scaffold-eth";

const TITLE = "Confirm data and create a new plan";
const DESCRIPTION = "Have a last check to the plan. when clicking confirm, the plan will be listed on Botblock market.";

const Confirm = () => {
  const { plan } = useWeb3AuthContext();
  const BotBlockContractAddress = "0xabe0D51F2f537c14CE782B26Fb3A59EB4A563316";
  const { isLoading, write } = useContractWrite({
    address: BotBlockContractAddress,
    abi: BotBlockMarketArtifact.abi as any[],
    functionName: "createPlan",
    onError(error) {
      notification.error(`Transaction failed: ${error}`);
    },
    onSuccess(data) {
      notification.success(`Transaction with hash ${data?.hash} completed successfully!`, {
        icon: "🎉",
      });
    },
  });

  const handleCreatePlan = async () => {
    try {
      write({
        args: [plan?.paymentTokenAddress, plan?.price, "1", plan?.uri],
      });
    } catch (error) {
      console.error;
    }
  };

  return (
    <div className="p-32 flex-grow" data-theme="exampleUi">
      <h1 className="text-4xl sm:text-6xl">{TITLE}</h1>
      <h3 className="text-xl sm:text-2xl">{DESCRIPTION}</h3>
      <div className="grid grid-cols-2 gap-4">{plan && <PlanDetailsBox title={"Recap"} plan={plan} />}</div>
      {isLoading ? <Loader /> : <Button title={"Create Plan"} onClick={handleCreatePlan} />}
    </div>
  );
};

export default Confirm;
