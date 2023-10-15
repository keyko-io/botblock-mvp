export const writeNewRobots = (original: string, newConfig: Record<string, boolean>) => {
  const lines = original.split("\n");
  let currentAgent = "";
  const savedAgents: string[] = [];
  const agentsList = Object.keys(newConfig);

  // Overwrite original's config lines with new config
  const newLines = lines.map(line => {
    // break if no further changes are needed
    if (agentsList.length === savedAgents.length) {
      return line;
    }
    // get current agent
    if (line.includes("User-agent")) {
      currentAgent = line.split("User-agent: ")[1];
      return line;
    }
    // process path allow directive
    if (line.includes("Allow")) {
      const allowedPath = line.split("Allow: ")[1];
      const idx = agentsList.indexOf(currentAgent);
      // Check if the directive needs to be changed
      if (allowedPath === "/" && idx >= 0) {
        const shouldBlock = newConfig[agentsList[idx]];
        savedAgents.push(agentsList[idx]);
        if (shouldBlock) {
          return "Disallow: " + allowedPath;
        }
      }
      return line;
    }
    // process path disallow directive
    if (line.includes("Disallow")) {
      const disallowedPath = line.split("Disallow: ")[1];
      const idx = agentsList.indexOf(currentAgent);
      // Check if the directive needs to be changed
      if (disallowedPath === "/" && idx >= 0) {
        const shouldAllow = !newConfig[agentsList[idx]];
        savedAgents.push(agentsList[idx]);
        if (shouldAllow) {
          return "Allow: " + disallowedPath;
        }
      }
      return line;
    }
    return line;
  });

  // @TODO: add missing user-agents

  return newLines;
};
