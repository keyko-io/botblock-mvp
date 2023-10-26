import { useRouter } from "next/router";
import { Button } from "~~/components/Button";
import { RobotsTxtDisplay } from "~~/components/robots-txt/RobotsTxtDisplay";
import { UserAgentCheckList } from "~~/components/robots-txt/UserAgentCheckList";
import { useRobotsContext } from "~~/context/RobotsContext";

export const RobotsTxt = () => {
  const router = useRouter();
  const { parsedRobotsTxt, rewrittenRobots } = useRobotsContext();

  const redirectToLanding = () => router.replace("/protect/landing");

  if (!parsedRobotsTxt) {
    return (
      <div className="p-32 flex-grow" data-theme="exampleUi">
        <h1 className="text-4xl sm:text-6xl mb-32">Please go to the previous page to initiate the protect process</h1>
        <Button onClick={redirectToLanding} title={"Click here"} />
      </div>
    );
  }

  return (
    <div className="p-32 flex-grow" data-theme="exampleUi">
      <h1 className="text-4xl sm:text-6xl">{!!rewrittenRobots ? "New robots.txt file" : "Analyze your robots.txt"}</h1>
      <h3 className="text-xl sm:text-2xl">
        {!!rewrittenRobots
          ? "Copy the new file and use it on your site"
          : "Select which user agents you want to block from your site"}
      </h3>
      {!!rewrittenRobots ? <RobotsTxtDisplay /> : <UserAgentCheckList />}
    </div>
  );
};

export default RobotsTxt;
