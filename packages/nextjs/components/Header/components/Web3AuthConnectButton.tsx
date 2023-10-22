import { useEffect } from "react";
import toast from "react-hot-toast";
import { useWeb3AuthContext } from "~~/context/Web3AuthContext";

export const Web3AuthConnectButton = () => {
  const { connectWeb3Auth, initProvider, initWeb3Auth } = useWeb3AuthContext();

  const openConnectModal = async () => {
    try {
      await connectWeb3Auth();
      toast.success("Successfully logged in");
    } catch (error) {
      console.error(error);
      toast.error("Error while trying to connect. Please try again");
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        await initWeb3Auth();
        await initProvider();
        console.log("Successfully initiated web3auth");
      } catch (error) {
        console.error(JSON.stringify(error));
      }
    };

    initAuth();
  }, [initProvider, initWeb3Auth]);

  return (
    <button className="btn btn-primary btn-sm" onClick={openConnectModal} type="button">
      Log in
    </button>
  );
};
