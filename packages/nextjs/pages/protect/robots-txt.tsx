import { useRouter } from "next/router";
import { UserAgentCheckList } from "~~/components/robots-txt/UserAgentCheckList";
import { useRobotsContext } from "~~/context/RobotsContext";

export const RobotsTxt = () => {
  const router = useRouter();
  const { parsedRobotsTxt } = useRobotsContext();

  const redirectToLanding = () => router.replace("/protect/landing");

  if (!parsedRobotsTxt) {
    return (
      <div className="p-32 flex-grow" data-theme="exampleUi">
        <h1 className="text-4xl sm:text-6xl mb-32">Please go to the previous page to initiate the protect process</h1>
        <button
          className="btn btn-primary w-32 rounded-full capitalize font-normal font-white flex items-center gap-1 hover:gap-2 transition-all tracking-widest"
          onClick={redirectToLanding}
        >
          Click here
        </button>
      </div>
    );
  }

  return (
    <div className="p-32 flex-grow" data-theme="exampleUi">
      <h1 className="text-4xl sm:text-6xl">Analyze your robots.txt</h1>
      <h3 className="text-xl sm:text-2xl">Select which user agents you want to block from your site</h3>
      <UserAgentCheckList />
    </div>
  );
};

export default RobotsTxt;
