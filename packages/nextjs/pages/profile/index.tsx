import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { LoginButton } from "~~/components/Header/LoginButton";
import { Order, Plan, TokenAddress, tokenAddressMap } from "~~/context/Types";
import { useBBContractReads } from "~~/hooks/Botblock";
import { ContractNames } from "~~/hooks/Botblock/hooksUtils";
import { palette } from "~~/styles/colors";
import { Column, Text } from "~~/ui";

const Table = ({
  title,
  headers,
  emptyTableMessage,
  rows,
  textAlignment,
  containerStyle,
}: {
  title?: string;
  headers: string[];
  emptyTableMessage: string;
  rows?: string[][];
  textAlignment?: ("left" | "center" | "right")[];
  containerStyle?: React.CSSProperties;
}) => {
  return (
    <div className="grid grid-cols-2 gap-4" style={{ ...containerStyle }}>
      <div className="container w-fit">
        <div className="shadow-md overflow-x-auto rounded p-4" style={{ backgroundColor: palette.turquoise[20] }}>
          <Text type="h2" style={{ marginBottom: "8px" }}>
            {title}
          </Text>
          <table className="w-full border-collapse bg-black">
            <thead>
              <tr>
                {headers.map(header => (
                  <Text key={`${header}-key`} as="th" type="subheading" style={{ borderWidth: "1px", padding: "8px" }}>
                    {header}
                  </Text>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows?.length ? (
                rows.map((row, index) => (
                  <tr key={index}>
                    {row.map((cell, index) => (
                      <Text
                        key={`${cell}-${index}`}
                        as="th"
                        type="sm-print"
                        style={{ textAlign: textAlignment?.[index] ?? "center", padding: "8px", borderWidth: "1px" }}
                      >
                        {cell}
                      </Text>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={headers.length}>
                    <Text style={{ textAlign: "center" }}>{emptyTableMessage}</Text>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

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
        <Table
          title={"Your orders"}
          headers={["Website", "Duration", "Status"]}
          emptyTableMessage="Looks like there are no subscriptions associated with this address!"
          rows={userOrders?.map(order => [
            order.plan.uri,
            `${order.plan.expirationBlock} Month${Number(order.plan.expirationBlock) > 1 ? "s" : ""}`,
            order.status.toString(),
          ])}
          containerStyle={{
            marginTop: "32px",
            marginBottom: "64px",
          }}
        />
        <Table
          title={"Your plans"}
          headers={["Website", "Duration", "Price"]}
          emptyTableMessage="Looks like there are no plans created with this address!"
          rows={userPlans?.map(plan => [
            plan.uri,
            `${plan.expirationBlock} Month${Number(plan.expirationBlock) > 1 ? "s" : ""}`,
            `${plan.price} ${tokenAddressMap[plan.paymentTokenAddress as TokenAddress]}`,
          ])}
        />
      </>
    </div>
  );
};

export default Profile;
