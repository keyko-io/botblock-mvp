import { useRouter } from "next/router";

const StatusPage = () => {
  const router = useRouter();
  const orderId = router.query.orderId as string;

  return (
    <div className="p-32 flex-grow" data-theme="exampleUi">
      <h1 className="text-4xl sm:text-6xl">Status page for orderId: {orderId}</h1>
      <h3 className="text-xl sm:text-2xl">Details on your purchase</h3>
    </div>
  );
};

export default StatusPage;
