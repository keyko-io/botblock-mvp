import { useState } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { LoginButton } from "~~/components";
import { Plan, Token, TokenAddress, tokenAddressMap } from "~~/context/Types";
import { useWeb3AuthContext } from "~~/context/Web3AuthContext";
import { coreColors } from "~~/styles/colors";
import { Button, Column, Input, Row, Select, Text } from "~~/ui";

const TITLE = "Partner with Botblock to get paid from AI";
const DESCRIPTION =
  "Create a plan. Once an AI bot will subscribe, Botblock will send a robot.txt you'll have 10 days to update in your website. then, you'll get the money in you wallet";
const PRICE_PLACEHOLDER = "How much you want to charge?";
const TOKEN_SELECTION_LABEL = "Which Stablecoin you want to get?";
const SUBSCRIPTION_DURATION_LABEL = "Select subscription length";

const CTA_SUBMIT = "Submit";

const Landing = () => {
  const { setPlanData } = useWeb3AuthContext();
  const { address, isConnected } = useAccount();

  const [uri, setUrl] = useState("");
  const [price, setPrice] = useState(1);
  const [paymentTokenAddress, setPaymentTokenAddress] = useState(TokenAddress[Token.KIT]);
  const [duration, setDuration] = useState("1Month");
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const router = useRouter();

  const handleOnSubmit = () => {
    setIsLoading(true);
    const plan: Plan = {
      contentCreator: address || "",
      expirationBlock: 1,
      price,
      paymentTokenAddress,
      uri,
    };
    setPlanData(plan);
    router.push("/partner/confirm");
  };
  const handleSetUrl = (input: string) => {
    if (input === "") {
      setIsValid(true);
      return;
    }
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    const isValidURL = urlRegex.test(input);
    setIsValid(isValidURL);
    if (isValidURL) setUrl(input);
  };

  return (
    <Column style={{ padding: "48px", gap: "48px" }}>
      <Text type="h1">{TITLE}</Text>
      <Text type="h3">{DESCRIPTION}</Text>
      <Column style={{ gap: "16px" }}>
        {/* URI */}
        <Input
          label={"Website URL"}
          placeholder={"https://www.example.com/"}
          type="text"
          onChange={e => handleSetUrl(e.target.value)}
          onKeyUp={e => e.key === "Enter" && handleOnSubmit()}
        />
        {!isValid && (
          <Text type="sm-print" style={{ marginTop: "4px", color: coreColors.red }}>
            Please enter a valid website URL.
          </Text>
        )}

        {/* PRICE */}
        <Input
          label={"Price"}
          type="number"
          min="1"
          placeholder={PRICE_PLACEHOLDER}
          onChange={e => setPrice(Number(e.target.value))}
          onKeyUp={e => e.key === "Enter" && handleOnSubmit()}
          value={price}
        />
        <Row style={{ gap: "16px" }}>
          {/* DURATION */}
          <Select
            id="duration-select"
            label={SUBSCRIPTION_DURATION_LABEL}
            onChange={value => setDuration(value)}
            options={["1Month", "3Months", "9Months", "12Months"]}
            selected={duration}
          />

          {/* TOKEN */}
          <Select
            id="currency-select"
            label={TOKEN_SELECTION_LABEL}
            onChange={value => setPaymentTokenAddress(TokenAddress[value as Token])}
            options={[Token.USDC, Token.DAI, Token.USDT, Token.APE, Token.KIT]}
            selected={tokenAddressMap[paymentTokenAddress]}
            value={paymentTokenAddress}
          />
        </Row>
      </Column>
      {!isConnected ? (
        <Row style={{ gap: "16px" }}>
          <Text type="h3">Please log in to continue:</Text>
          <LoginButton />
        </Row>
      ) : (
        !!uri &&
        isValid && (
          <Button onClick={handleOnSubmit} disabled={isLoading} icon="arrow-right">
            {CTA_SUBMIT}
          </Button>
        )
      )}
    </Column>
  );
};

export default Landing;
