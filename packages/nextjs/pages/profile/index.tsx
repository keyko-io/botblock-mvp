import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { LoginButton } from "~~/components/Header/LoginButton";
import { Order, Plan, TokenAddress, tokenAddressMap } from "~~/context/Types";
import { useBBContractReads } from "~~/hooks/Botblock";
import { ContractNames } from "~~/hooks/Botblock/hooksUtils";
import { Column, Text } from "~~/ui";

const Profile = () => {
  const [userOrders, setUserOrders] = useState<Order[]>();
  const [userPlans, setUserPlans] = useState<Plan[]>();
  const { address, isConnected } = useAccount();
  const { allPlans, allOrders } = useBBContractReads({ contractName: ContractNames.BOTBLOCK });

  useEffect(() => {
    if (allPlans && address) {
      setUserPlans(allPlans?.filter(plan => plan.contentCreator === address));
    }
  }, [address, allPlans]);

  useEffect(() => {
    if (allOrders && address) {
      setUserOrders(allOrders?.filter(order => order.buyer === address));
    }
  }, [address, allOrders]);

  if (!isConnected) {
    return (
      <Column style={{ flex: 1 }}>
        <Text type="h2" style={{ margin: "24px 0" }}>
          Please log in to access this area
        </Text>
        <LoginButton />
      </Column>
    );
  }

  return (
    <div className="p-32 flex-grow">
      <Text type="h1">{address} - Welcome to your profile</Text>
      <>
        <div className="grid grid-cols-2 gap-4 mt-4 mb-16">
          <div className="container w-fit">
            <div className="bg-gray-200 shadow-md overflow-x-auto rounded p-4">
              <Text type="h2" style={{ marginBottom: "8px" }}>
                Your orders
              </Text>
              <table className="w-full border-collapse bg-black">
                <thead>
                  <tr>
                    <Text as="th" type="subheading" style={{ borderWidth: "1px", padding: "8px" }}>
                      Website
                    </Text>
                    <Text as="th" type="subheading" style={{ borderWidth: "1px", padding: "8px" }}>
                      Duration
                    </Text>
                    <Text as="th" type="subheading" style={{ borderWidth: "1px", padding: "8px" }}>
                      Status
                    </Text>
                  </tr>
                </thead>
                <tbody>
                  {userOrders?.length ? (
                    userOrders.map((order, index) => (
                      <tr key={index}>
                        <Text as="th" style={{ textAlign: "center", padding: "8px", borderWidth: "1px" }}>
                          {order.plan.uri}
                        </Text>
                        <Text as="th" style={{ textAlign: "center", padding: "8px", borderWidth: "1px" }}>
                          {order.plan.expirationBlock} Month{Number(order.plan.expirationBlock) > 1 ? "s" : ""}
                        </Text>
                        <Text as="th" style={{ textAlign: "center", padding: "8px", borderWidth: "1px" }}>
                          {order.status}
                        </Text>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3}>
                        <Text style={{ textAlign: "center" }}>
                          Looks like there are no subscriptions associated with this address!
                        </Text>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="container w-fit">
            <div className="bg-gray-200 shadow-md overflow-x-auto rounded p-4">
              <Text type="h2" style={{ marginBottom: "8px" }}>
                Your plans
              </Text>
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr>
                    <Text as="th" type="subheading" style={{ borderWidth: "1px", padding: "8px" }}>
                      Website
                    </Text>
                    <Text as="th" type="subheading" style={{ borderWidth: "1px", padding: "8px" }}>
                      Duration
                    </Text>
                    <Text as="th" type="subheading" style={{ borderWidth: "1px", padding: "8px" }}>
                      Price
                    </Text>
                  </tr>
                </thead>
                <tbody>
                  {userPlans?.length ? (
                    userPlans.map((plan, index) => (
                      <tr key={index}>
                        <Text as="th" style={{ textAlign: "center", padding: "8px", borderWidth: "1px" }}>
                          {plan.uri}
                        </Text>
                        <Text as="th" style={{ textAlign: "center", padding: "8px", borderWidth: "1px" }}>
                          {plan.expirationBlock} Month{plan.expirationBlock !== "1" && "s"}
                        </Text>
                        <Text as="th" style={{ textAlign: "end", padding: "8px", borderWidth: "1px" }}>
                          {plan.price} {tokenAddressMap[plan.paymentTokenAddress as TokenAddress]}
                        </Text>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3}>
                        <Text style={{ textAlign: "center" }}>
                          Looks like there are no plans created with this address!
                        </Text>
                      </td>
                    </tr>
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
