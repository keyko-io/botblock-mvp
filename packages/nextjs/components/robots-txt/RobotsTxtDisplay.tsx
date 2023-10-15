import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import { useRobotsContext } from "~~/context/RobotsContext";

export const RobotsTxtDisplay = () => {
  const { rewrittenRobots } = useRobotsContext();

  return !!rewrittenRobots ? (
    <div>
      <pre className="overflow-auto bg-slate-600 p-4 h-96">
        <code className="text-zinc-200" lang="language-yaml">
          {rewrittenRobots}
        </code>
      </pre>
      <div className="mt-16">
        <CopyToClipboard text={rewrittenRobots} onCopy={() => toast.success("Successfully copied")}>
          <button className="btn btn-primary w-48 rounded-full capitalize font-normal font-white flex items-center gap-1 hover:gap-2 transition-all tracking-widest">
            Copy to clipboard
          </button>
        </CopyToClipboard>
      </div>
    </div>
  ) : (
    <></>
  );
};
