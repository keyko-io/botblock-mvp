import toast from "react-hot-toast";
import { useDisconnect } from "wagmi";
import { Button } from "~~/ui";

export const LogoutButton = () => {
  const { disconnect } = useDisconnect();

  const logOut = async () => {
    try {
      disconnect();
      toast.success("Successfully logged out");
    } catch (error) {
      console.error(error);
      toast.error("Error while trying to disconnect. Please try again");
    }
  };
  return (
    <Button onClick={logOut} color="ternary" size="lg">
      Log Out
    </Button>
  );
};
