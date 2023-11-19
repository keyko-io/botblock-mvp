import { useState } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { Plan, Token, TokenAddress } from "~~/context/Types";
import { useWeb3AuthContext } from "~~/context/Web3AuthContext";
import { Button } from "~~/ui";
import { RainbowKitCustomConnectButton } from "~~/ui/Header/components/RainbowKitCustomConnectButton";

const TITLE = "Partner with Botblock to get paid from AI";
const DESCRIPTION =
  "Create a plan. Once an AI bot will subscribe, Botblock will send a robot.txt you'll have 10 days to update in your website. then, you'll get the money in you wallet";
const URI_PLACEHOLDER = "Insert the URL of your site here";
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
    router.push("/unlock/partner/confirm");
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
    <div className="p-32 flex-grow" data-theme="exampleUi">
      <h1 className="text-4xl sm:text-6xl">{TITLE}</h1>
      <h3 className="text-xl sm:text-2xl">{DESCRIPTION}</h3>
      <div className="grid grid-cols-2 gap-4">
        {/* URI */}
        <div>
          <input
            type="text"
            placeholder={URI_PLACEHOLDER}
            className={
              isValid
                ? "input font-bai-jamjuree w-full px-5 bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white uppercase"
                : "input font-bai-jamjuree w-full px-5 bg-[length:100%_100%] border border-error text-lg sm:text-2xl placeholder-white uppercase"
            }
            onChange={e => handleSetUrl(e.target.value)}
            onKeyUp={e => e.key === "Enter" && handleOnSubmit()}
          />
          {!isValid && <p className="text-error text-sm mt-1">Please enter a valid website URL.</p>}
        </div>

        {/* PRICE */}
        <input
          type="number"
          min="1"
          placeholder={PRICE_PLACEHOLDER}
          className="input font-bai-jamjuree w-full px-5 bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white uppercase"
          onChange={e => setPrice(Number(e.target.value))}
          onKeyUp={e => e.key === "Enter" && handleOnSubmit()}
          value={price}
        />
        {/* DURATION */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 flex items-center">
            <label htmlFor="select" className="text-lg font-medium text-gray-600">
              {SUBSCRIPTION_DURATION_LABEL}
            </label>
          </div>

          <div className="col-span-2">
            <div className="flex">
              <select
                id="select"
                className="block w-full px-4 py-2 leading-5 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                onChange={e => setDuration(e.target.value)}
                value={duration}
              >
                <option value="1Month">1 Month</option>
                <option value="3Months">3 Months</option>
                <option value="9Months">9 Months</option>
                <option value="12Months">12 Months</option>
              </select>
            </div>
          </div>
        </div>

        {/* TOKEN */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 flex items-center">
            <label htmlFor="select" className="text-lg font-medium text-gray-600">
              {TOKEN_SELECTION_LABEL}
            </label>
          </div>

          <div className="col-span-2">
            <div className="flex">
              <select
                id="select"
                className="block w-full px-4 py-2 leading-5 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                onChange={e => setPaymentTokenAddress(e.target.value as TokenAddress)}
                value={paymentTokenAddress}
              >
                <option value={TokenAddress[Token.USDC]}>{Token.USDC}</option>
                <option value={TokenAddress[Token.DAI]}>{Token.DAI}</option>
                <option value={TokenAddress[Token.USDT]}>{Token.USDT}</option>
                <option value={TokenAddress[Token.APE]}>{Token.APE}</option>
                <option value={TokenAddress[Token.KIT]}>{Token.KIT}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {!isConnected && (
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
          <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
            <div className="flex rounded-full border-2 border-primary p-1">
              <RainbowKitCustomConnectButton />
            </div>
          </div>
        </div>
      )}
      {!!uri && isValid && isConnected && (
        <Button onClick={handleOnSubmit} disabled={isLoading} icon="arrow-right">
          {CTA_SUBMIT}
        </Button>
      )}
    </div>
  );
};

export default Landing;
