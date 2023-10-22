import { Web3AuthConnectButton } from "~~/components/Header/components/Web3AuthConnectButton";
import { useWeb3AuthContext } from "~~/context/Web3AuthContext";

const Profile = () => {
  const { isConnected, username } = useWeb3AuthContext();

  if (!isConnected) {
    return (
      <div className="p-32 flex-grow" data-theme="exampleUi">
        <h1 className="text-2xl sm:text-3xl my-8">Please log in to access this area</h1>
        <Web3AuthConnectButton />
      </div>
    );
  }

  return (
    <div className="p-32 flex-grow" data-theme="exampleUi">
      <h1 className="text-2xl sm:text-3xl">Welcome to your profile, {username}</h1>
    </div>
  );
};

export default Profile;
