import { useState } from "react";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";

const TITLE = "Title";
const DESCRIPTION = "Description";
const INPUT_PLACEHOLDER = "Insert the URL of your site here";
const CTA_TEXT = "Submit";

const Landing = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = () => {
    setIsLoading(true);
    alert(url);
    setIsLoading(false);
  };

  return (
    <div>
      <h1 className="text-4xl sm:text-6xl">{TITLE}</h1>
      <h3 className="text-xl sm:text-2xl">{DESCRIPTION}</h3>
      <input type="text" placeholder={INPUT_PLACEHOLDER} onChange={e => setUrl(e.target.value)} />
      {!!url && (
        <button onClick={handleOnSubmit} disabled={isLoading}>
          {isLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <>
              {CTA_TEXT} <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default Landing;
