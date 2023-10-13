import { useEffect, useState } from "react";
import axios from "axios";

// NGROK tunneling
const EXPRESS_URL = "https://correctly-leading-chicken.ngrok-free.app";

export async function getRobotsTxtContents(url: string) {
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
      return data;
    }
    console.error(`Failed to fetch robots.txt. Status code: ${status}`);
    return null;
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
}

// TODO: move to context
export const useRobots = (url: string) => {
  const [responseRobots, setResponseRobots] = useState("");

  useEffect(() => {
    if (!responseRobots && !!url) {
      getRobotsTxtContents(url)
        .then(res => {
          if (res) {
            setResponseRobots(res);
          }
          return res;
        })
        .catch(console.error);
    }
  }, [responseRobots, url]);

  return { responseRobots };
};
