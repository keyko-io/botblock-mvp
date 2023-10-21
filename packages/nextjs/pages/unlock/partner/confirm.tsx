import Recap from "~~/components/unlock/Recap";
import { useWeb3AuthContext } from "~~/context/Web3AuthContext";
import { notification } from "~~/utils/scaffold-eth";

const TITLE = "Confirm data and create a new plan";
const DESCRIPTION = "Have a last check to the plan. when clicking confirm, the plan will be listed on Botblock market.";

const Confirm = () => {
  const { plan, subsContract } = useWeb3AuthContext();

  const handleCreatePlan = async () => {
    if (plan) {
      const pendingNotifId = notification.loading(`Transaction is pending`);
      const tx = await subsContract?.createPlan(plan.paymentTokenAddress, plan.price, "1", plan.uri);
      const receipt = await tx?.wait();
      notification.remove(pendingNotifId);

      if (receipt?.status) {
        notification.success(`Transaction with hash ${tx?.hash} completed successfully!`, {
          icon: "🎉",
        });
      }
    } else {
      notification.error("you need to log in first");
    }
  };

  return (
    <div className="p-32 flex-grow" data-theme="exampleUi">
      <h1 className="text-4xl sm:text-6xl">{TITLE}</h1>
      <h3 className="text-xl sm:text-2xl">{DESCRIPTION}</h3>
      <div className="grid grid-cols-2 gap-4">{plan && <Recap plan={plan} />}</div>
      <button className="btn btn-primary btn-sm" onClick={handleCreatePlan} type="button">
        Create Plan
      </button>
    </div>
  );
};

export default Confirm;
