import { useEffect } from "react";
import { useRouter } from "next/router";

const StatusLanding = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/profile");
  }, [router]);

  return <></>;
};

export default StatusLanding;
