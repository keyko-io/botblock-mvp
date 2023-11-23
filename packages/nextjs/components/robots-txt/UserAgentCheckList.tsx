import { useEffect, useState } from "react";
import { useRobotsContext } from "~~/context/RobotsContext";
import { Button, Loader, Text } from "~~/ui";

const recommendedAgentsToBlock = ["GPTBot", "CCBot"];

export const UserAgentCheckList = () => {
  const { parsedRobotsTxt, generateNewRobots, rewrittenRobots } = useRobotsContext();
  const [isLoading, setIsLoading] = useState(true);
  const [showNewFile, setShowNewFile] = useState(false);
  const [userAgents, setUserAgents] = useState<string[]>([]);
  const [userAgentBlockSelection, setUserAgentBlockSelection] = useState<Record<string, boolean>>(
    recommendedAgentsToBlock.reduce((acc, agent) => ({ ...acc, [agent]: true }), {}),
  );

  const toggleAgent = (agent: string) => {
    if (userAgents.includes(agent)) {
      setUserAgentBlockSelection(prevState => ({ ...prevState, [agent]: !prevState?.[agent] }));
    }
  };

  const handleGenerateRobots = () => {
    setIsLoading(true);
    generateNewRobots(userAgentBlockSelection);
  };

  useEffect(() => {
    if (parsedRobotsTxt && !userAgents.length) {
      // Generate list of user-agents + recommended ones if missing
      setUserAgents(
        Object.keys({
          ...parsedRobotsTxt,
          ...userAgentBlockSelection,
        }),
      );
    }
  }, [userAgentBlockSelection, parsedRobotsTxt, userAgents.length]);

  useEffect(() => {
    if (parsedRobotsTxt && userAgents) {
      const simplifiedObj = userAgents.reduce(
        (acc, agent) => ({
          ...acc,
          // Add user's configuration and if not there, set to true by default (recommended)
          [agent]: !parsedRobotsTxt[agent]?.generallyAllowed,
        }),
        {},
      );
      setUserAgentBlockSelection(simplifiedObj);
      setIsLoading(false);
    }
  }, [parsedRobotsTxt, userAgents]);

  useEffect(() => {
    if (!!rewrittenRobots && isLoading && !showNewFile) {
      setShowNewFile(true);
      setIsLoading(false);
    }
  }, [isLoading, rewrittenRobots, showNewFile]);

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <ul>
        {userAgents.map((agent, idx) => (
          <li key={`${agent}-${idx}`} className="flex flex-row mt-4" onClick={() => toggleAgent(agent)}>
            <input type="checkbox" value={agent} checked={userAgentBlockSelection[agent]} />
            <Text style={{ marginLeft: "16px" }}>
              {recommendedAgentsToBlock.includes(agent) && "[Recommended]"} {agent}
            </Text>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Button onClick={handleGenerateRobots}>
          <span className="font-medium text-white">Generate new robots file</span>
        </Button>
      </div>
    </div>
  );
};
