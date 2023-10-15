import { useRobotsContext } from "~~/context/RobotsContext";

export const RobotsTxtDisplay = () => {
  const { rewrittenRobots } = useRobotsContext();
  return (
    <div>
      <pre className="overflow-auto bg-slate-600 p-4 h-96">
        <code className="text-zinc-200" lang="language-yaml">
          {rewrittenRobots}
        </code>
      </pre>
    </div>
  );
};
