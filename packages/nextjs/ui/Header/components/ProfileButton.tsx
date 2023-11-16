import toast from "react-hot-toast";
import { useWeb3AuthContext } from "~~/context/Web3AuthContext";

export const ProfileButton = () => {
  const { disconnectWeb3Auth, username } = useWeb3AuthContext();
  const logOut = async () => {
    try {
      await disconnectWeb3Auth();
      toast.success("Successfully logged out");
    } catch (error) {
      console.error(error);
      toast.error("Error while trying to disconnect. Please try again");
    }
  };

  return (
    <button className="btn btn-primary btn-sm" onClick={logOut} type="button">
      {username && `[${username}] `}→ Log out
    </button>
  );
};
