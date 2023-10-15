import { useEffect, useState } from "react";
import { useRobotsContext } from "~~/context/RobotsContext";

const recommendedAgentsToBlock = ["GPTBot", "CCBot"];

export const UserAgentCheckList = () => {
  const { parsedRobotsTxt, generateNewRobots } = useRobotsContext();
  const [isLoading, setIsLoading] = useState(true);
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

  return !isLoading ? (
    <div>
      <ul>
        {userAgents.map((agent, idx) => (
          <li key={`${agent}-${idx}`} className="flex flex-row gap-4" onClick={() => toggleAgent(agent)}>
            <input type="checkbox" value={agent} checked={userAgentBlockSelection[agent]} />
            <p>
              {recommendedAgentsToBlock.includes(agent) && "[Recommended]"} {agent}
            </p>
          </li>
        ))}
      </ul>
      <button
        className="btn btn-primary w-60 rounded-full capitalize font-normal font-white flex items-center gap-1 hover:gap-2 transition-all tracking-widest"
        onClick={handleGenerateRobots}
      >
        Generate new robots file
      </button>
    </div>
  ) : (
    <span className="loading loading-spinner loading-sm" />
  );
};
