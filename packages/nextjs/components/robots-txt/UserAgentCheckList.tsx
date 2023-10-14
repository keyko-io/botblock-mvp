import { useEffect, useState } from "react";
import { useRobotsContext } from "~~/context/RobotsContext";

const recommendedAgentsToBlock = ["GPTBot", "CCBot"];

export const UserAgentCheckList = () => {
  const { parsedRobotsTxt } = useRobotsContext();
  const [isLoading, setIsLoading] = useState(true);
  const [userAgents, setUserAgents] = useState<string[]>([]);
  const [newRobots, setNewRobots] = useState<Record<string, boolean>>(
    recommendedAgentsToBlock.reduce((acc, agent) => ({ ...acc, [agent]: true }), {}),
  );

  const toggleAgent = (agent: string) => {
    if (userAgents.includes(agent)) {
      setNewRobots(prevState => ({ ...prevState, [agent]: !prevState?.[agent] }));
    }
  };

  useEffect(() => {
    if (parsedRobotsTxt && !userAgents.length) {
      // Generate list of user-agents + recommended ones if missing
      setUserAgents(
        Object.keys({
          ...parsedRobotsTxt,
          ...newRobots,
        }),
      );
    }
  }, [newRobots, parsedRobotsTxt, userAgents.length]);

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
      setNewRobots(simplifiedObj);
      setIsLoading(false);
    }
  }, [parsedRobotsTxt, userAgents]);

  return !isLoading ? (
    <div>
      <ul>
        {userAgents.map((agent, idx) => (
          <li key={`${agent}-${idx}`} className="flex flex-row gap-4" onClick={() => toggleAgent(agent)}>
            <input type="checkbox" value={agent} checked={newRobots[agent]} />
            <p>
              {recommendedAgentsToBlock.includes(agent) && "[Recommended]"} {agent}
            </p>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <span className="loading loading-spinner loading-sm" />
  );
};
