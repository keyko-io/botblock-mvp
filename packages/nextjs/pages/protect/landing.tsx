import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRobotsContext } from "~~/context/RobotsContext";
import { Button } from "~~/ui";

const TITLE = "Title";
const DESCRIPTION = "Description";
const INPUT_PLACEHOLDER = "Insert the URL of your site here";
const CTA_TEXT = "Submit";

const Landing = () => {
  const [url, setUrl] = useState("");
  const [submittedUrl, setSubmittedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { getRobotsTxt } = useRobotsContext();
  const router = useRouter();

  const handleOnSubmit = () => {
    setIsLoading(true);
    setSubmittedUrl(url);
  };

  useEffect(() => {
    const executeSubmission = async () => {
      try {
        await getRobotsTxt(submittedUrl);
        await router.push("robots-txt");
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoading && submittedUrl) {
      executeSubmission();
    }
  }, [getRobotsTxt, isLoading, router, submittedUrl]);

  return (
    <div className="p-32 flex-grow" data-theme="exampleUi">
      <h1 className="text-4xl sm:text-6xl">{TITLE}</h1>
      <h3 className="text-xl sm:text-2xl">{DESCRIPTION}</h3>
      <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
        <input
          type="text"
          placeholder={INPUT_PLACEHOLDER}
          className="input font-bai-jamjuree w-full px-5 bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white uppercase"
          onChange={e => setUrl(e.target.value)}
          onKeyUp={e => e.key === "Enter" && handleOnSubmit()}
        />
      </div>
      {!!url && (
        <Button disabled={isLoading} icon={"arrow-right"} onClick={handleOnSubmit}>
          {CTA_TEXT}
        </Button>
      )}
    </div>
  );
};

export default Landing;
