// @TODO: add testing
export const parseRobots = (s: string) => {
  const result: Record<string, { allow: string[]; disallow: string[]; generallyAllowed: boolean }> = {};

  const lines = s.split("\n");
  let currentAgent = "";

  lines.forEach(line => {
    if (line.includes("User-agent: ")) {
      currentAgent = line.split("User-agent: ")[1];
      result[currentAgent] = { allow: [], disallow: [], generallyAllowed: true };
      return;
    }
    if (line.includes("Allow: ")) {
      const allowedPath = line.split("Allow: ")[1];
      result[currentAgent]["allow"].push(allowedPath);
      return;
    }
    if (line.includes("Disallow: ")) {
      const disallowedPath = line.split("Disallow: ")[1];
      if (disallowedPath === "/") {
        result[currentAgent]["generallyAllowed"] = false;
      }
      result[currentAgent]["disallow"].push(disallowedPath);
      return;
    }
  });
  return result;
};
