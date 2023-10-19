import React, { useState } from "react";
import { ClipboardIcon } from "@heroicons/react/24/solid";

const CodeSnippetButton = () => {
  const [isCopied, setIsCopied] = useState(false);
  const linkUrl = "https://www.botblock.com";
  const buttonText = "Go to Botblock to authorize crawler";
  const codeToCopy = `<button onclick="window.location.href='${linkUrl}'">${buttonText}</button>`;

  const handleCopyClick = () => {
    navigator.clipboard.writeText(codeToCopy);
    setIsCopied(true);

    // Reset the "Copied" state after a brief delay
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <div className="relative">
      {isCopied && (
        <div className="absolute top-2 right-2 bg-green-500 text-white font-bold py-1 px-2 rounded">Copied!</div>
      )}
      {!isCopied && (
        <div className="absolute top-2 right-2 cursor-pointer" onClick={handleCopyClick}>
          <ClipboardIcon className="w-7 text-white border border-info rounded-full flex items-center justify-center" />
        </div>
      )}
      <pre
        className="bg-gray-800 p-4 rounded-md text-white overflow-x-auto"
        onClick={handleCopyClick}
        style={{ cursor: "pointer" }}
      >
        <code style={{ whiteSpace: "pre" }}>{codeToCopy}</code>
      </pre>
    </div>
  );
};

export default CodeSnippetButton;
