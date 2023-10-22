import { useEffect, useState } from "react";
import { Web3AuthConnectButton } from "~~/components/Header/components/Web3AuthConnectButton";
import { Order, Plan } from "~~/context/Types";
import { useWeb3AuthContext } from "~~/context/Web3AuthContext";

const Profile = () => {
  const [userOrders, setUserOrders] = useState<Order[]>();
  const [userPlans, setUserPlans] = useState<Plan[]>();
  const { address, getOrders, getPlans, isConnected, subsContract, username } = useWeb3AuthContext();

  useEffect(() => {
    const fetchPlans = async () => {
      const plans = await getPlans();
      setUserPlans(plans?.filter(plan => plan.contentCreator === address));
    };

    if (subsContract && address) {
      fetchPlans();
    }
  }, [address, getPlans, subsContract]);

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await getOrders();
      setUserOrders(orders);
    };

    if (subsContract) {
      fetchOrders();
    }
  }, [getOrders, subsContract]);

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
      <p>{JSON.stringify(userOrders)}</p>
      <p>{JSON.stringify(userPlans)}</p>
    </div>
  );
};

export default Profile;
