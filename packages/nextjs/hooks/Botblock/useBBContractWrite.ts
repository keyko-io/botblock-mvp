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

  // const [isEthBalance, setIsEthBalance] = useState(true);
  // const [balance, setBalance] = useState<number | null>(null);
  // const price = useGlobalState(state => state.nativeCurrencyPrice);

  // const {
  //   data: fetchedBalanceData,
  //   isError,
  //   isLoading,
  // } = useBalance({
  //   address,
  //   watch: true,
  //   chainId: getTargetNetwork().id,
  // });

  // const onToggleBalance = useCallback(() => {
  //   if (price > 0) {
  //     setIsEthBalance(!isEthBalance);
  //   }
  // }, [isEthBalance, price]);

  // useEffect(() => {
  //   if (fetchedBalanceData?.formatted) {
  //     setBalance(Number(fetchedBalanceData.formatted));
  //   }
  // }, [fetchedBalanceData]);

  // return { balance, price, isError, isLoading, onToggleBalance, isEthBalance };
}
