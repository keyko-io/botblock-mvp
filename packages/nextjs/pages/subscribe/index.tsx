import { useCallback, useEffect, useState } from "react";
import { Plan } from "~~/context/Types";
import { useWeb3AuthContext } from "~~/context/Web3AuthContext";

const Subscribe = () => {
  const { getPlans, subsContract } = useWeb3AuthContext();
  const [plans, setPlans] = useState<Plan[]>();

  const fetchPlans = useCallback(async () => {
    const p = await getPlans();
    setPlans(p);
  }, [getPlans]);

  useEffect(() => {
    if (subsContract) {
      fetchPlans();
    }
  }, [fetchPlans, subsContract]);

  return (
    <div className="p-32 flex-grow" data-theme="exampleUi">
      <h1 className="m-16">Subscribe</h1>
      {plans && plans.map((plan, idx) => <p key={`${idx}`}>{JSON.stringify(plan)}</p>)}
    </div>
  );
};

export default Subscribe;
