import { useState } from "react";
import { useRouter } from "next/router";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { Web3AuthConnectButton } from "~~/components/Header/components/Web3AuthConnectButton";
import { Plan } from "~~/context/Types";
import { useWeb3AuthContext } from "~~/context/Web3AuthContext";

const TITLE = "Partner with Botblock to get paid from AI";
const DESCRIPTION =
  "Create a plan. Once an AI bot will suscribe, Botblock will send a robot.txt you'll have 10 days to update in your website. then, you'll get the money in you wallet";
const URI_PLACEHOLDER = "Insert the URL of your site here";
const PRICE_PLACEHOLDER = "How much you want to charge?";
const TOKEN_SELECTION_LABEL = "Which Stablecoin you want to get?";
const SUBSCRIPTION_DURATION_LABEL = "Select subscription length";

const CTA_SUBMIT = "Submit";

const Landing = () => {
  const { isConnected, setPlanData } = useWeb3AuthContext();

  const [url, setUrl] = useState("");
  const [price, setPrice] = useState(1);
  const [token, setToken] = useState("APE");
  const [duration, setDuration] = useState("1Month");
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const router = useRouter();

  const handleOnSubmit = () => {
    setIsLoading(true);
    const plan: Plan = {
      planId: 1,
      contentCreator: "address",
      expirationBlock: 1,
      price: 1,
      paymentTokenAddress: "0x179522635726710Dd7D2035a81d856de4Aa7836c", //USDC
      uri: "https://www.ciao.io",
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
                ? "input font-bai-jamjuree w-full px-5 bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white uppercase"
                : "input font-bai-jamjuree w-full px-5 bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] border border-error text-lg sm:text-2xl placeholder-white uppercase"
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
          className="input font-bai-jamjuree w-full px-5 bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white uppercase"
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
                onChange={e => setToken(e.target.value)}
                value={token}
              >
                {/* APECoin is giving out prizes */}
                <option value="USDC">USDC</option>
                <option value="DAI">DAI</option>
                <option value="USDT">USDT</option>
                <option value="APE">APECoin</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {!isConnected && (
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
          <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
            <div className="flex rounded-full border-2 border-primary p-1">
              <Web3AuthConnectButton></Web3AuthConnectButton>
            </div>
          </div>
        </div>
      )}
      {!!url && isValid && isConnected && (
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
          <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
            <div className="flex rounded-full border-2 border-primary p-1">
              <button
                className="btn btn-primary w-32 rounded-full capitalize font-normal font-white flex items-center gap-1 hover:gap-2 transition-all tracking-widest"
                onClick={handleOnSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>
                    {CTA_SUBMIT} <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
