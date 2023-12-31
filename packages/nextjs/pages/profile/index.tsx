import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { LoginButton } from "~~/components";
import { Order, Plan, TokenAddress, tokenAddressMap } from "~~/context/Types";
import { useBBContractReads } from "~~/hooks/Botblock";
import { ContractNames } from "~~/hooks/Botblock/hooksUtils";
import { coreColors, palette } from "~~/styles/colors";
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
    <Column
      style={{
        width: undefined,
        display: "grid",
        padding: "16px",
        gap: "16px",
        borderRadius: "8px",
        backgroundColor: palette.turquoise[20],
        ...containerStyle,
      }}
    >
      <Text type="h2" style={{ marginBottom: "8px" }}>
        {title}
      </Text>
      <table style={{ backgroundColor: coreColors.black, borderCollapse: "collapse" }}>
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
                <Text style={{ textAlign: "center", padding: "16px 8px" }}>{emptyTableMessage}</Text>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Column>
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
    <Column style={{ padding: "48px" }}>
      <Column style={{ gap: "16px" }}>
        <Text type="h1">Welcome to your profile</Text>
        <Text type="h3">{address}</Text>
      </Column>
      <Column style={{ alignItems: "center" }}>
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
      </Column>
    </Column>
  );
};

export default Profile;
