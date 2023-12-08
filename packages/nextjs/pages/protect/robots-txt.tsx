import { useRouter } from "next/router";
import { RobotsTxtDisplay } from "~~/components/robots-txt/RobotsTxtDisplay";
import { UserAgentCheckList } from "~~/components/robots-txt/UserAgentCheckList";
import { useRobotsContext } from "~~/context/RobotsContext";
import { Button, Text } from "~~/ui";

export const RobotsTxt = () => {
  const router = useRouter();
  const { parsedRobotsTxt, rewrittenRobots } = useRobotsContext();

  const redirectToLanding = () => router.replace("/protect/landing");

  if (!parsedRobotsTxt) {
    return (
      <div className="w-[1024px] flex mx-auto mt-24 flex-col">
        <Text as={"h1"} type="h1" style={{ marginBottom: "1rem" }}>
          Please go to the previous page to initiate the protect process
        </Text>
        <Button onClick={redirectToLanding}>{"Click here"}</Button>
      </div>
    );
  }

  return (
    <div className="w-[1024px] flex mx-auto mt-24 flex-col">
      <Text as={"h1"} type="h1">
        {!!rewrittenRobots ? "New robots.txt file" : "Analyze your robots.txt"}
      </Text>
      <Text as={"h3"} type="h3" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        {!!rewrittenRobots
          ? "Copy the new file and use it on your site"
          : "Select which user agents you want to block from your site"}
      </Text>
      {!!rewrittenRobots ? <RobotsTxtDisplay /> : <UserAgentCheckList />}
    </div>
  );
};

export default RobotsTxt;
