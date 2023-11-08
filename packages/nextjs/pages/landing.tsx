import BlackGrungeImage from "~~/public/assets/images/black-grunge.png";
import { palette } from "~~/styles/colors";
import { Text } from "~~/ui";

const Body = () => {
  return (
    <div
      className="flex flex-col"
      style={{ flex: 3, backgroundImage: `url("${BlackGrungeImage.src}")`, backgroundSize: "cover" }}
    ></div>
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
