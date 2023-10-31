import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Web3AuthConnectButton } from "~~/components/Header/components/Web3AuthConnectButton";
import { Order, Plan, TokenAddress, tokenAddressMap } from "~~/context/Types";
import { useWeb3AuthContext } from "~~/context/Web3AuthContext";
import { useBBContractReads } from "~~/hooks/Botblock";
import { ContractNames } from "~~/hooks/Botblock/hooksUtils";

const Profile = () => {
  const [userOrders, setUserOrders] = useState<Order[]>();
  const [userPlans, setUserPlans] = useState<Plan[]>();
  const { username } = useWeb3AuthContext();
  const { address, isConnected } = useAccount();
  const { allPlans, allOrders } = useBBContractReads({ contractName: ContractNames.BOTBLOCK });

  useEffect(() => {
    const fetchPlans = async () => {
      setUserPlans(allPlans?.filter(plan => plan.contentCreator === address));
    };


    fetchPlans();

  }, [isConnected]);

  useEffect(() => {
    const fetchOrders = async () => {
      setUserOrders(allOrders?.filter(order => order.buyer === address));
    };
    fetchOrders();

  }, [isConnected]);

  if (!isConnected) {
    return (
      <div className="p-32 flex-grow" data-theme="exampleUi">
        <h1 className="text-2xl sm:text-3xl my-8">Please log in to access this area</h1>
        <Web3AuthConnectButton />
      </div>
    );
  }

  return (
    <div className="p-32 flex-grow" data-theme="exampleUi">
      <h1 className="text-2xl sm:text-3xl">Welcome to your profile, {username}</h1>
      <>
        <div className="grid grid-cols-2 gap-4 mt-4 mb-16">
          <div className="container w-fit">
            <div className="bg-gray-200 shadow-md overflow-x-auto rounded p-4">
              <h2 className="text-2xl font-bold mb-4">Your orders</h2>
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr>
                    <th className="border p-2">Website</th>
                    <th className="border p-2">Duration</th>
                    <th className="border p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userOrders?.length ? (
                    userOrders.map((order, index) => (
                      <tr key={index}>
                        <td className="border p-2 text-center">{order.plan.uri}</td>
                        <td className="border p-2 text-center">
                          {order.plan.expirationBlock} Month{Number(order.plan.expirationBlock) > 1 ? "s" : ""}
                        </td>
                        <td className="border p-2 text-end">{order.status}</td>
                      </tr>
                    ))
                  ) : (
                    <p> Looks like there are no subscriptions associated with this address!</p>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="container w-fit">
            <div className="bg-gray-200 shadow-md overflow-x-auto rounded p-4">
              <h2 className="text-2xl font-bold mb-4">Your plans</h2>
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr>
                    <th className="border p-2">Website</th>
                    <th className="border p-2">Duration</th>
                    <th className="border p-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {userPlans?.length ? (
                    userPlans.map((plan, index) => (
                      <tr key={index}>
                        <td className="border p-2 text-center">{plan.uri}</td>
                        <td className="border p-2 text-center">
                          {plan.expirationBlock} Month{plan.expirationBlock !== "1" && "s"}
                        </td>
                        <td className="border p-2 text-end">
                          {plan.price} {tokenAddressMap[plan.paymentTokenAddress as TokenAddress]}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <p> Looks like there are no plans created with this address!</p>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Profile;
