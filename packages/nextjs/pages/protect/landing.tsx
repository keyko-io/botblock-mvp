import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";

const TITLE = "Title";
const DESCRIPTION = "Description";
const INPUT_PLACEHOLDER = "Insert the URL of your site here";
const CTA_TEXT = "Submit";

const Landing = () => {
  return (
    <div>
      <h1 className="text-4xl sm:text-6xl">{TITLE}</h1>
      <h3 className="text-xl sm:text-2xl">{DESCRIPTION}</h3>
      <div>
        <input type="text" placeholder={INPUT_PLACEHOLDER} />
      </div>
      <button>
        {CTA_TEXT} <ArrowSmallRightIcon />
      </button>
    </div>
  );
};

export default Landing;
