import CodeSnippetButton from "~~/components/CodeSnippet";
import { useWeb3AuthContext } from "~~/context/Web3AuthContext";

const TITLE = "Next Steps";
const STEP_ONE = "Check your email with the instructions to update the robots.txt";
const STEP_TWO = "Botblock will automatically check the update on your robots.txt and send you the subscription money";
const STEP_THREE =
  "Place the widget on your site to guide AI devs to Botblock for subscription purchases";

const NextSteps = () => {
  const { email } = useWeb3AuthContext();
  return (
    <div className="p-32 flex-grow" data-theme="exampleUi">
      <h1 className="text-4xl sm:text-6xl">{TITLE}</h1>

      <div className="flex flex-col">
        <div className="flex items-center mb-4">
          <span className="text-gray-600 font-bold px-3 border-r border-gray-600">Step 1</span>
          <h3 className="text-xl sm:text-2xl pl-3">{STEP_ONE}</h3>
        </div>

        <div className="font-bold  text-center">Your Email is {email}</div>
      </div>
      <br />
      <div className="flex items-center">
        <span className="text-gray-600 font-bold px-3 border-r border-gray-600">Step 2</span>
        <h3 className="text-xl sm:text-2xl pl-3">{STEP_TWO}</h3>
      </div>
      <br />
      <div className="flex items-center">
        <span className="text-gray-600 font-bold px-3 border-r border-gray-600">Step 3</span>
        <h3 className="text-xl sm:text-2xl pl-3">{STEP_THREE}</h3>
      </div>
      <br />

      <div className="col-span-2 md:col-span-1 flex items-center justify-center">
        <CodeSnippetButton />
      </div>
    </div>
  );
};

export default NextSteps;
