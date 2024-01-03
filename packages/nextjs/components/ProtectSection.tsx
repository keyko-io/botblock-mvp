import { SVGProps } from "react";
import dynamic from "next/dynamic";
import ProtectForm from "~~/components/ProtectForm";
import { palette } from "~~/styles/colors";
import { Text } from "~~/ui";

const ScribbleIcon = dynamic<SVGProps<any>>(() => import("~~/public/assets/icons/scribble.svg"));

const ProtectSection = () => {
  return (
    <div className="flex flex-col" style={{ backgroundColor: "transparent", padding: "0px 0px" }}>
      <div className="mx-20 flex flex-row justify-start items-center">
        <ScribbleIcon color={palette.turquoise[100]} />
        <Text type="h2">Protect your site from bots right now</Text>
      </div>
      <div className="flex flex-col justify-center items-center px-12 gap-4" style={{ margin: "20px 0px" }}>
        <Text>{`Enter your site's URL to scan your robots.txt file`}</Text>
        <div className="flex flex-row gap-2">
          <ProtectForm />
        </div>
      </div>
    </div>
  );
};

export default ProtectSection;
