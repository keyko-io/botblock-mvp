import { useEffect } from "react";
import { useWeb3AuthContext } from "~~/context/Web3AuthContext";

export const Web3AuthConnectButton = () => {
  const { initWeb3Auth } = useWeb3AuthContext();

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

  return (
    <button className="btn btn-primary btn-sm" type="button">
      Log in
    </button>
  );
};
