import { SVGProps, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { NextPage } from "next";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { LoginButton } from "~~/components";
import { useRobotsContext } from "~~/context/RobotsContext";
import { Plan, TokenAddress, tokenAddressMap } from "~~/context/Types";
import { useNvmContext } from "~~/context/nvm/NvmContext";
import { useBBContractReads } from "~~/hooks/Botblock";
import { ContractNames } from "~~/hooks/Botblock/hooksUtils";
import { palette } from "~~/styles/colors";
import { Button, Input, Text } from "~~/ui";

const ScribbleIcon = dynamic<SVGProps<any>>(() => import("~~/public/assets/icons/scribble.svg"));

const Title = () => {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        padding: "20px 0px",
      }}
    >
      <div className="mx-20 flex flex-col justify-start items-center" style={{ width: 300 }}>
        <img src="/images/whoyagonnacall.png"></img>
      </div>

      <div style={{ width: "66%" }}>
        <Text type="h1" style={{ marginBottom: "30px", fontWeight: "bold", textAlign: "left" }}>
          Make AI Crawlers pay for your content...
        </Text>
        <Text type="subheading" style={{ marginBottom: "20px", textAlign: "left" }}>
          Protect your site from AI crawlers from getting your content for their datasets.
        </Text>
        <Text type="subheading" style={{ textAlign: "left" }}>
          Once protected, create a subscription plan for AI companies to pay for access with just a couple of clicks!
        </Text>
      </div>
    </div>
  );
};

const ProtectSection = () => {
  const [url, setUrl] = useState("");
  const [submittedUrl, setSubmittedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { getRobotsTxt } = useRobotsContext();
  const router = useRouter();

  const handleOnSubmit = () => {
    setIsLoading(true);
    setSubmittedUrl(url);
  };

  useEffect(() => {
    const executeSubmission = async () => {
      try {
        new URL(url);
        await getRobotsTxt(submittedUrl);
        router.push("/protect/robots-txt");
      } catch (error: any) {
        if (error.message && error.message.includes("URL")) {
          toast.error("Please enter a valid URL");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoading && submittedUrl) {
      executeSubmission();
    }
  }, [getRobotsTxt, isLoading, router, submittedUrl, url]);

  return (
    <div className="flex flex-col" style={{ backgroundColor: "transparent", padding: "0px 0px" }}>
      <div className="mx-20 flex flex-row justify-start items-center">
        <ScribbleIcon color={palette.turquoise[100]} />
        <Text type="h2">Protect your site from bots right now</Text>
      </div>
      <div className="flex flex-col justify-center items-center px-12 gap-4" style={{ margin: "20px 0px" }}>
        <Text>{`Enter your site's URL to scan your robots.txt file`}</Text>
        <div className="flex flex-row gap-2">
          <Input
            label="URL"
            value={url}
            disabled={isLoading}
            placeholder="https://www.example.com"
            onChange={e => setUrl(e.currentTarget.value)}
            onKeyDown={e => e.key === "Enter" && handleOnSubmit()}
          />
          <Button size="lg" onClick={handleOnSubmit}>
            Scan
          </Button>
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
    <div style={{ display: "flex", flexDirection: "column", padding: "20px 0px" }}>
      <div className="mx-20 flex flex-row justify-start items-center">
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
                        <td className="border p-2 text-center">
                          {plan.price} {tokenAddressMap[plan.paymentTokenAddress as TokenAddress]}
                        </td>
                        <td className="border p-2 text-center">
                          <Button onClick={() => browseToSubscriptionDetails(plan)}>More details</Button>
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
    <Title />
    <ProtectSection />
    <SubscriptionOverviewSection />
    {/* Uncomment below to check the NVM test */}
    {/* <NvmTest /> */}
  </div>
);

export default Landing;
