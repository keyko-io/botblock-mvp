import ProtectForm from "~~/components/ProtectForm";
import { Text } from "~~/ui";

const TITLE = "Title";
const DESCRIPTION = "Description";

const Landing = () => {
  return (
    <div className="max-w-[1024px] flex flex-col mx-auto mt-24">
      <div className="flex-grow">
        <Text as={"h1"} type="h1">
          {TITLE}
        </Text>
        <Text as={"h3"} type="h3" style={{ marginTop: "1rem" }}>
          {DESCRIPTION}
        </Text>
      </div>
      <ProtectForm />
    </div>
  );
};

export default Landing;
