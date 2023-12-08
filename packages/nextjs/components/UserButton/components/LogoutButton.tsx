import toast from "react-hot-toast";
import { useDisconnect } from "wagmi";
import { Button } from "~~/ui";

interface LogoutButtonProps {
  onLogout?: () => void;
}

export const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
  const { disconnect } = useDisconnect();

  const logOut = async () => {
    try {
      disconnect();
      onLogout && onLogout();
      toast.success("Successfully logged out");
    } catch (error) {
      console.error(error);
      toast.error("Error while trying to disconnect. Please try again");
    }
  };
  return (
    <Button onClick={logOut} color="ternary" size="lg" fullWidth>
      Log Out
    </Button>
  );
};
