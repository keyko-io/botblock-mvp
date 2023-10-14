import { useRobotsContext } from "~~/context/RobotsContext";

export const UserAgentCheckList = () => {
  const { parsedRobotsTxt } = useRobotsContext();
  const userAgents = parsedRobotsTxt ? Object.keys(parsedRobotsTxt) : [];
  return (
    parsedRobotsTxt && (
      <ul>
        {userAgents.map((agent, idx) => (
          <li key={agent + idx}>
            {agent} is {parsedRobotsTxt[agent].generallyAllowed ? "" : "not "}allowed
          </li>
        ))}
      </ul>
    )
  );
};
