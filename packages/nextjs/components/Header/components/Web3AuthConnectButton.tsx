import { useEffect } from "react";
import toast from "react-hot-toast";
import { useWeb3AuthContext } from "~~/context/Web3AuthContext";

export const Web3AuthConnectButton = () => {
  const { connectWeb3Auth, disconnectWeb3Auth, initWeb3Auth, isConnected } = useWeb3AuthContext();

  const openConnectModal = async () => {
    try {
      await connectWeb3Auth();
      toast.success("Successfully logged in");
    } catch (error) {
      console.error(error);
      toast.error("Error while trying to connect. Please try again");
    }
  };

  const logOut = async () => {
    try {
      await disconnectWeb3Auth();
      toast.success("Successfully logged out");
    } catch (error) {
      console.error(error);
      toast.error("Error while trying to disconnect. Please try again");
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        await initWeb3Auth();
        console.log("Successfully initiated web3auth");
      } catch (error) {
        console.error(JSON.stringify(error));
      }
    };

    initAuth();
  }, [initWeb3Auth]);

  return isConnected ? (
    <button className="btn btn-primary btn-sm" onClick={logOut} type="button">
      Log out
    </button>
  ) : (
    <button className="btn btn-primary btn-sm" onClick={openConnectModal} type="button">
      Log in
    </button>
  );
};
