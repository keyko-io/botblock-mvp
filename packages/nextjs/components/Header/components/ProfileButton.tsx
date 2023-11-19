import toast from "react-hot-toast";
import { useDisconnect } from "wagmi";

interface ProfileButtonProps {
  name?: string;
}

export const ProfileButton = ({ name }: ProfileButtonProps) => {
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
    <button className="btn btn-primary btn-sm" onClick={logOut} type="button">
      {name && `[${name}] `}→ Log out
    </button>
  );
};
