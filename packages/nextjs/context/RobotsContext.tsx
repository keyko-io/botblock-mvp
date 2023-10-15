import { PropsWithChildren, useEffect, useState } from "react";
import { createCtx } from ".";
import axios from "axios";
import { parseRobots } from "~~/utils/robots/parseRobots";
import { writeNewRobots } from "~~/utils/robots/writeNewRobots";

// NGROK tunneling
const EXPRESS_URL = "https://correctly-leading-chicken.ngrok-free.app";

// State variables only
type RobotsContextState = {
  originalRobotsTxt?: string;
  parsedRobotsTxt?: Record<string, { allow: string[]; disallow: string[]; generallyAllowed: boolean }>;
  rewrittenRobots?: string;
};

// This interface differentiates from State
// because it holds any other option or fx
// that handle the state in some way
interface RobotsContext extends RobotsContextState {
  getRobotsTxt: (url: string) => Promise<void>;
  generateNewRobots: (userAgentBlockSelection: Record<string, boolean>) => void;
}

const [useContext, RobotsContextProvider] = createCtx<RobotsContext>("web3Context");

export const RobotsProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<RobotsContextState>();

  useEffect(() => {
    if (!!state?.originalRobotsTxt) {
      const parsedRobotsTxt = parseRobots(state.originalRobotsTxt);
      setState(prevState => ({ ...prevState, parsedRobotsTxt }));
    }
  }, [state?.originalRobotsTxt]);

  const getRobotsTxt = async (url: string) => {
    try {
      const { data, status } = await axios.get<string>(`${EXPRESS_URL}/fetch-robots-txt`, {
        headers: new axios.AxiosHeaders({
          "ngrok-skip-browser-warning": "69420",
        }),
        params: {
          url,
        },
      });

      if (status === 200) {
        setState(prevState => ({ ...prevState, originalRobotsTxt: data }));
        return;
      }
      const errMsg = `Failed to fetch robots.txt. Status code: ${status}`;
      console.error(errMsg);
      throw new Error(errMsg);
    } catch (error) {
      const errMsg = `An error occurred!\n${error}`;
      console.error(errMsg);
      throw new Error(errMsg);
    }
  };

  const generateNewRobots = (userAgentBlockSelection: Record<string, boolean>) => {
    if (state?.originalRobotsTxt) {
      const rewrittenRobots = writeNewRobots(state?.originalRobotsTxt, userAgentBlockSelection);
      setState(prevState => ({ ...prevState, rewrittenRobots }));
    }
    return;
  };

  return (
    <RobotsContextProvider value={{ ...state, getRobotsTxt, generateNewRobots }}>{children}</RobotsContextProvider>
  );
};

export const useRobotsContext = useContext;
