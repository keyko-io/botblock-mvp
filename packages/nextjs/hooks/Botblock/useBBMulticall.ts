import { useState } from "react";
import { ContractsAndAbis, UseBBContractWrite } from "./hooksUtils";
import { multicall } from "@wagmi/core";

/**
 * @param contractName: name of the contract (needed to load abi)
 * @param functionName: name of the function
 */

export function useBBMulticall() {
  const [data, setData] = useState({});
  const [isMulticallLoading, setIsMulticallLoading] = useState(false);
  const [isMulticallError, setIsMulticallError] = useState(false);

  const buildArray = (contracts: UseBBContractWrite[]) =>
    contracts.map(({ contractName, functionName, args }: UseBBContractWrite) => {
      return {
        address: ContractsAndAbis[contractName].address,
        abi: ContractsAndAbis[contractName].abi as any[],
        functionName,
        args,
      };
    });

  const makeCall = async (contracts: UseBBContractWrite[]) => {
    try {
      setIsMulticallLoading(true);
      const contractsArray = buildArray(contracts);
      const result = await multicall({
        contracts: contractsArray as any,
      });
      setData(result);
      setIsMulticallLoading(false);
    } catch (error) {
      setIsMulticallLoading(false);
      setIsMulticallError(true);
      console.error;
    }
  };

  return { data, isMulticallLoading, isMulticallError, makeCall };
}
