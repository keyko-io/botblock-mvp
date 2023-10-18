// import { useState } from "react";
// import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
// import { useRouter } from "next/router";

const TITLE = "Confirm data and create a new plan";
const DESCRIPTION = "lorem ipsum description";
// const URI_PLACEHOLDER = "Insert the URL of your site here";
// const PRICE_PLACEHOLDER = "How much you want to charge?";
// const TOKEN_SELECTION_LABEL = "Which Stablecoin you want to get?";
// const SUBSCRIPTION_DURATION_LABEL = "Select subscription length";

// const CTA_TEXT = "Submit";

const Confirm = () => {
  // const [url, setUrl] = useState("");
  // const [price, setPrice] = useState(1);
  // const [token, setToken] = useState("APE");
  // const [duration, setDuration] = useState("1Month");
  // const [isLoading, setIsLoading] = useState(false);
  // const [isValid, setIsValid] = useState(true);

  // const router = useRouter();

  // const handleOnSubmit = () => {
  //   setIsLoading(true);
  //   router.push()
  // };

  return (
    <div className="p-32 flex-grow" data-theme="exampleUi">
      <h1 className="text-4xl sm:text-6xl">{TITLE}</h1>
      <h3 className="text-xl sm:text-2xl">{DESCRIPTION}</h3>
      <div className="grid grid-cols-2 gap-4">HERE THE CONFIRMATION AND PLAN CREATION</div>
    </div>
  );
};

export default Confirm;
