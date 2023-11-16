import { useEffect, useState } from "react";
import { ContractsAndAbis, UseBBContractWrite } from "./hooksUtils";
import toast from "react-hot-toast";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

/**
 * @param contractName: name of the contract (needed to load abi)
 * @param functionName: name of the function
 */

export function useBBContractWrite({ contractName, functionName }: UseBBContractWrite) {
  const [writeHook, setWriteHook] = useState<any>();

  const { config } = usePrepareContractWrite({
    address: ContractsAndAbis[contractName].address,
    abi: ContractsAndAbis[contractName].abi as any[],
    functionName,
  });

  const hook = useContractWrite({
    ...config,
    onError(error) {
      toast.error(`Transaction failed: ${error}`);
    },
    onSuccess(data) {
      toast.success(`Transaction with hash ${data?.hash} completed successfully!`, {
        icon: "🎉",
      });
    },
  });

  useEffect(() => {
    if (!writeHook) {
      setWriteHook(hook);
    }
  }, [hook, writeHook]);

  return { ...writeHook };
}
