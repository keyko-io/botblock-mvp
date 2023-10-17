import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Protect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/unlock/partner/landing");
  }, [router]);
  return <></>;
}
