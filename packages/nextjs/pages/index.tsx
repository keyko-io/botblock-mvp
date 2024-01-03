import { SVGProps, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextPage } from "next";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { LoginButton } from "~~/components";
import ProtectForm from "~~/components/ProtectForm";
import ProtectIcon from "~~/components/ProtectIcon";
import { Plan, TokenAddress, tokenAddressMap } from "~~/context/Types";
import { useNvmContext } from "~~/context/nvm/NvmContext";
import { useBBContractReads } from "~~/hooks/Botblock";
import { ContractNames } from "~~/hooks/Botblock/hooksUtils";
import { palette } from "~~/styles/colors";
import { Button, Text } from "~~/ui";

const ScribbleIcon = dynamic<SVGProps<any>>(() => import("~~/public/assets/icons/scribble.svg"));

const Hero = () => {
  return (
    <div className="container mx-auto min-h-screen flex justify-center items-center text-white -mt-20">
      <div className="w-4/5 mx-auto text-center">
        <h1 className="text-[64px] mb-10">Get paid for your content by AI crawlers</h1>
        <p className="text-[18px]">
          With BotBlock you can protect your site from AI crawlers from getting your content for their datasets. When
          your site is protected, you can create a subscription plan for AI companies to pay for access in just a couple
          of clicks!
        </p>
        <Link href="/protect" className="flex items-center justify-center mt-10 cursor-pointer">
          <ProtectIcon />
          <span className="absolute font-bold text-[18px]">Protect</span>
        </Link>
      </div>
    </div>
  );
};

const ProtectSection = () => {
  return (
    <div className="flex flex-col" style={{ backgroundColor: "transparent", padding: "24px 0px" }}>
      <div className="mx-12 flex flex-row justify-start items-center">
        <ScribbleIcon color={palette.turquoise[100]} />
        <Text type="h2">Protect your site from bots</Text>
      </div>
      <div className="flex flex-col justify-center items-center px-12 gap-4" style={{ margin: "48px 0px" }}>
        <Text>{`Enter your site's URL to scan your robots.txt file`}</Text>
        <div className="flex flex-row gap-8">
          <ProtectForm />
        </div>
      </div>
    </div>
  );
};

const SubscriptionOverviewSection = () => {
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>();
  const { allPlans } = useBBContractReads({ contractName: ContractNames.BOTBLOCK });

  useEffect(() => {
    if (allPlans) {
      // Just take the first 5 plans for now
      setPlans((allPlans as Plan[]).slice(0, 5));
    }
  }, [allPlans]);

  const browseToSubscriptionDetails = (plan: Plan) => {
    if (plan.planID) {
      router.push("/subscribe/" + plan.planID);
    }
  };
  const browseToSubscriptionLanding = () => {
    router.push("/subscribe");
  };
  // TODO: tweak this UI
  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "48px" }}>
      <div className="flex flex-row justify-start items-center">
        <ScribbleIcon color={palette.turquoise[100]} />
        <Text type="h2">Available Subscriptions</Text>
      </div>
      <div className="flex flex-col justify-center items-center py-12 gap-8">
        <div className="grid gap-4">
          <div className="container w-fit">
            <div className="bg-white shadow-md overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2">Website</th>
                    <th className="border p-2">Content creator address</th>
                    <th className="border p-2">Duration</th>
                    <th className="border p-2">Price</th>
                    <th className="border p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {plans &&
                    plans.map((plan, index) => (
                      <tr key={index}>
                        <td className="border p-2 text-center">{plan.uri}</td>
                        <td className="border p-2 text-end">{plan.contentCreator}</td>
                        <td className="border p-2 text-center">
                          {plan.expirationBlock} Month{plan.expirationBlock !== "1" && "s"}
                        </td>
                        {/* <td className="border p-2">{plan.paymentTokenAddress}</td> */}
                        <td className="border p-2 text-end">
                          {plan.price} {tokenAddressMap[plan.paymentTokenAddress as TokenAddress]}
                        </td>
                        <td className="border p-2 text-center">
                          <Button color="secondary" onClick={() => browseToSubscriptionDetails(plan)}>
                            More details
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Button size="lg" onClick={browseToSubscriptionLanding}>
          For the full list of subscriptions
        </Button>
      </div>
    </div>
  );
};

// Component meant to troubleshoot and test the NVM context
export const NvmTest = () => {
  const [assets, setAssets] = useState<string[]>();
  const [shouldQuery, setShouldQuery] = useState(false);
  const { isConnected } = useAccount();
  const { queryAssets } = useNvmContext();

  useEffect(() => {
    if (shouldQuery) {
      queryAssets()
        .then(res => {
          setAssets(res.results.map(asset => asset.service.find(s => s.type === "metadata")?.attributes.main.name));
        })
        .catch(err => toast.error(err.message))
        .finally(() => setShouldQuery(false));
    }
  }, [queryAssets, shouldQuery]);

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "48px" }}>
      {!isConnected ? (
        <>
          <Text>Please log in</Text>
          <LoginButton />
        </>
      ) : (
        <>
          <Button onClick={() => setShouldQuery(true)}>Query Assets</Button>
          {assets?.map((asset, idx) => (
            <Text key={`${asset}-${idx}`}>{asset}</Text>
          ))}
        </>
      )}
    </div>
  );
};

const Landing: NextPage = () => (
  <div className="flex flex-col">
    <Hero />
    <ProtectSection />
    <SubscriptionOverviewSection />
    {/* Uncomment below to check the NVM test */}
    {/* <NvmTest /> */}
  </div>
);

export default Landing;
