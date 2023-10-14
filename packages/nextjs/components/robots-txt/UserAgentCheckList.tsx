import { useEffect, useState } from "react";
import { useRobotsContext } from "~~/context/RobotsContext";

export const UserAgentCheckList = () => {
  const { parsedRobotsTxt } = useRobotsContext();
  const [userAgents, setUserAgents] = useState<string[]>([]);
  const [newRobots, setNewRobots] = useState<Record<string, boolean>>();

  const toggleAgent = (agent: string) => {
    if (userAgents.includes(agent)) {
      setNewRobots(prevState => ({ ...prevState, [agent]: !prevState?.[agent] }));
    }
  };

  useEffect(() => {
    if (parsedRobotsTxt) {
      setUserAgents(Object.keys(parsedRobotsTxt));
    }
  }, [parsedRobotsTxt]);

  useEffect(() => {
    if (parsedRobotsTxt && userAgents) {
      const simplifiedObj = userAgents.reduce(
        (acc, agent) => ({
          ...acc,
          [agent]: !parsedRobotsTxt[agent].generallyAllowed,
        }),
        {},
      );
      setNewRobots(simplifiedObj);
    }
  }, [parsedRobotsTxt, userAgents]);

  return newRobots ? (
    <div>
      <ul>
        {userAgents.map((agent, idx) => (
          <li key={`${agent}-${idx}`} className="flex flex-row gap-4" onClick={() => toggleAgent(agent)}>
            <input type="checkbox" value={agent} checked={newRobots[agent]} />
            <p>{agent}</p>
          </li>
        ))}
      </ul>
    </div>
  ) : undefined;
};
