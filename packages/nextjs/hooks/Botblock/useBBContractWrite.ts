import { useEffect, useState } from "react";
import { ContractsAndAbis, UseBBContractWrite } from "./hooksUtils";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { notification } from "~~/utils/scaffold-eth";

/**
 * @param contractName: name of the contract (needed to load abi)
 * @param functionName: name of the function
 */

export function useBBContractWrite({ contractName, functionName }: UseBBContractWrite) {
  // address?: string
  const [writeHook, setWriteHook] = useState<any>({});

  const { config } = usePrepareContractWrite({
    address: ContractsAndAbis[contractName].address,
    abi: ContractsAndAbis[contractName].abi as any[],
    functionName,
  })

  const hook = useContractWrite({
    ...config,
    onError(error) {
      notification.error(`Transaction failed: ${error}`);
    },
    onSuccess(data) {
      notification.success(`Transaction with hash ${data?.hash} completed successfully!`, {
        icon: "🎉",
      });
    },
  });

  useEffect(() => {
    setWriteHook(hook);
  }, []);

  return { ...writeHook };

}
