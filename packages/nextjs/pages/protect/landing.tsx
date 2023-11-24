import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useRobotsContext } from "~~/context/RobotsContext";
import { Button, Input, Text } from "~~/ui";

const TITLE = "Title";
const DESCRIPTION = "Description";
const INPUT_PLACEHOLDER = "Insert the URL of your site here";
const CTA_TEXT = "Submit";

const Landing = () => {
  const router = useRouter();

  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { getRobotsTxt } = useRobotsContext();

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url) {
      toast.error(`Please enter a URL.`);
      return;
    }

    const isUrlValid = isValidURL(url);

    if (!isUrlValid) {
      toast.error(`Please enter a valid URL.`);
      return;
    }

    try {
      setIsLoading(true);
      await getRobotsTxt(url);
      await router.push("robots-txt");
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isValidURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="max-w-[1024px] flex mx-auto mt-24">
      <div className="flex-grow">
        <Text as={"h1"} type="h1">
          {TITLE}
        </Text>
        <Text as={"h3"} type="h3" style={{ marginTop: "1rem" }}>
          {DESCRIPTION}
        </Text>

        <form className="mt-8 text-black flex w-full" onSubmit={handleOnSubmit}>
          <div className="flex-1 mr-2">
            <Input
              placeholder={INPUT_PLACEHOLDER}
              value={url}
              onChange={e => setUrl((e.target as HTMLInputElement).value)}
            />
          </div>

          <Button icon={"arrow-right"} disabled={isLoading} type="submit" isLoading={isLoading}>
            <span className="font-medium text-white">{CTA_TEXT} </span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Landing;
