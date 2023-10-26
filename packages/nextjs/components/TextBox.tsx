import React, { PropsWithChildren } from "react";

interface TextBoxProps {
  title?: string;
}

const TextBox = ({ children, title }: PropsWithChildren<TextBoxProps>) => {
  return (
    <div className="bg-white rounded-md shadow-md p-4 mb-4">
      {title ? <h2 className="text-2xl font-bold mb-4">{title}</h2> : null}
      {children}
    </div>
  );
};

export default TextBox;
