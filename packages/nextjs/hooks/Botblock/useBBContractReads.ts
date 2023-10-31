import { BBFunctions, ContractsAndAbis, UseBBContractWrite } from "./hooksUtils";
import { useContractReads } from "wagmi";

/**
 * @param contractName: name of the contract (needed to load abi)
 * @param functionName: name of the function
 */

export function useBBContractReads({ contractName }: UseBBContractWrite) {
  const contract = ContractsAndAbis[contractName] as any;
  const hook = useContractReads({
    contracts: [
      {
        ...contract,
        functionName: BBFunctions.GET_ALL_PLANS,
      },
      {
        ...contract,
        functionName: BBFunctions.GET_ALL_ORDERS,
      },
    ],
  });

  return {
    allPlans: hook.data && hook.data[0].result,
    allOrders: hook.data && hook.data[1].result,
  };
}
