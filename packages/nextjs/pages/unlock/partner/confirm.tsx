import { useRouter } from "next/router";
import { Button } from "~~/components/Button";
import { Loader } from "~~/components/Loader";
import PlanDetailsBox from "~~/components/PlanDetailsBox";
import { useWeb3AuthContext } from "~~/context/Web3AuthContext";
import { useBBContractWrite } from "~~/hooks/Botblock";
import { BBFunctions, ContractNames } from "~~/hooks/Botblock/hooksUtils";


const TITLE = "Confirm data and create a new plan";
const DESCRIPTION = "Have a last check to the plan. when clicking confirm, the plan will be listed on Botblock market.";

const Confirm = () => {
  const router = useRouter();
  const { plan } = useWeb3AuthContext();
  const { isLoading, write } = useBBContractWrite({
    contractName: ContractNames.BOTBLOCK,
    functionName: BBFunctions.CREATE_PLAN,
  });

  const handleCreatePlan = async () => {
    try {
      write({
        args: [plan?.paymentTokenAddress, plan?.price, "1", plan?.uri],
      });
      router.push("/unlock/partner/next-steps");
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
