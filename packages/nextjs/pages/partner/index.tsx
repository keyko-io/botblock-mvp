import { useState } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { LoginButton } from "~~/components";
import { Plan, Token, TokenAddress, tokenAddressMap } from "~~/context/Types";
import { useWeb3AuthContext } from "~~/context/Web3AuthContext";
import { Button, Column, Input, Row, Select, Text } from "~~/ui";

const TITLE = "Partner with Botblock to get paid from AI";
const DESCRIPTION =
  "Create a subscription plan for your website. Once the crawler owners subscribes to it, you will be notified to update your robots.txt file. After that, you should head back here to confirm the update and start getting paid!";
const COMPLETE_FORM = "Please fill out the form below to create your subscription plan.";
const URL_INPUT_ERROR = "Please enter a valid website URL.";
const PRICE_PLACEHOLDER = "How much you want to charge?";
const TOKEN_SELECTION_LABEL = "Which Stablecoin you want to get?";
const SUBSCRIPTION_DURATION_LABEL = "Select subscription length";
const LOGIN_AUX_TEXT = "to submit";

const CTA_SUBMIT = "Submit";

const Landing = () => {
  const { setPlanData } = useWeb3AuthContext();
  const { address, isConnected } = useAccount();

  const [uri, setUrl] = useState("");
  const [price, setPrice] = useState(1);
  const [paymentTokenAddress, setPaymentTokenAddress] = useState(TokenAddress[Token.KIT]);
  const [duration, setDuration] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const router = useRouter();

  const handleOnSubmit = () => {
    setIsLoading(true);
    const plan: Plan = {
      contentCreator: address || "",
      expirationBlock: duration, // TODO: use duration to calculate expiration block
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
    <Column style={{ padding: "48px", gap: "24px" }}>
      <Text type="h1">{TITLE}</Text>
      <Text type="h3" style={{ marginBottom: "24px" }}>
        {DESCRIPTION}
      </Text>
      <Text type="subheading">{COMPLETE_FORM}</Text>
      <Column style={{ gap: "16px" }}>
        {/* URI */}
        <Input
          label={"Website URL"}
          placeholder={"https://www.example.com/"}
          type="text"
          onChange={e => handleSetUrl(e.target.value)}
          onKeyUp={e => e.key === "Enter" && handleOnSubmit()}
          errorMessage={isValid ? undefined : URL_INPUT_ERROR}
        />

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

        {/* DURATION */}
        <Select
          id="duration-select"
          label={SUBSCRIPTION_DURATION_LABEL}
          onChange={value => (!!Number(value.split(" ")[0]) ? setDuration(Number(value.split(" ")[0])) : null)}
          options={["1 Month", "3 Months", "9 Months", "12 Months"]}
          selected={`${duration} Month${duration > 1 ? "s" : ""}`}
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
      </Column>
      {!isConnected ? (
        <Row style={{ gap: "8px" }}>
          <LoginButton />
          <Text type="h3">{LOGIN_AUX_TEXT}</Text>
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
