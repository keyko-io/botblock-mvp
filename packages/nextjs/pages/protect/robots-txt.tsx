import { useRouter } from "next/router";
import { useRobotsContext } from "~~/context/RobotsContext";

export const RobotsTxt = () => {
  const router = useRouter();
  const { originalRobotsTxt } = useRobotsContext();

  const redirectToLanding = () => router.replace("/protect/landing");

  if (!originalRobotsTxt) {
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
      <h1 className="text-4xl sm:text-6xl">On this page the CC user would analyze the robots.txt</h1>
    </div>
  );
};

export default RobotsTxt;
