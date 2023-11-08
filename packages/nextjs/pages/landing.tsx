import toast from "react-hot-toast";
import BlackGrungeImage from "~~/public/assets/images/black-grunge.png";
import { palette } from "~~/styles/colors";
import { Button, Text } from "~~/ui";

const Header = () => {
  return (
    <div className="flex flex-row justify-between items-center px-12 py-6 border-b-gray-500 border-b-2">
      <Text type="p-lg">BotBlock | by Keyko powered by NVM</Text>
      <Button onClick={() => toast.success("Log In button pressed")} color="ternary" icon="plus" size="sm">
        Log In
      </Button>
    </div>
  );
};

const Body = () => {
  return (
    <div
      className="flex flex-col"
      style={{ flex: 3, backgroundImage: `url("${BlackGrungeImage.src}")`, backgroundSize: "cover" }}
    >
      <Header />
    </div>
  );
};

const Footer = () => {
  return (
    <div
      className="flex flex-col px-12 justify-center items-center"
      style={{ flex: 1, backgroundColor: palette.slate[100] }}
    >
      <div style={{ height: "440px" }}>
        <Text color="light">Footer</Text>
      </div>
    </div>
  );
};

export const Landing = () => {
  return (
    <div className="flex flex-col" style={{ flex: 4, height: "100%" }}>
      <Body />
      <Footer />
    </div>
  );
};
