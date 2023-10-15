import { useEffect, useState } from "react";
import { useRobotsContext } from "~~/context/RobotsContext";

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
    <span className="loading loading-spinner loading-sm" />
  ) : showNewFile ? (
    <div>
      <pre className="overflow-auto bg-slate-600 p-4">
        <code className="text-zinc-200" lang="language-markdown">
          {rewrittenRobots}
        </code>
      </pre>
    </div>
  ) : (
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
  );
};
