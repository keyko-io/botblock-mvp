import { Button } from "../Button";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import { useRobotsContext } from "~~/context/RobotsContext";

export const RobotsTxtDisplay = () => {
  const { rewrittenRobots } = useRobotsContext();

  const exportRobotsTxt = () => {
    const fileData = rewrittenRobots ?? "";
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "robots.txt";
    link.href = url;
    link.click();
    toast.success("Successfully downloaded robots.txt");
  };

  return !!rewrittenRobots ? (
    <div>
      <pre className="overflow-auto bg-slate-600 p-4 h-96">
        <code className="text-zinc-200" lang="language-yaml">
          {rewrittenRobots}
        </code>
      </pre>
      <div className="mt-16 flex flex-row justify-evenly">
        <CopyToClipboard text={rewrittenRobots} onCopy={() => toast.success("Successfully copied")}>
          <Button title={"Copy to clipboard"} />
        </CopyToClipboard>
        <Button onClick={exportRobotsTxt} title={"Download file"} />
      </div>
    </div>
  ) : (
    <></>
  );
};
