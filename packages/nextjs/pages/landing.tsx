import { SVGProps, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import toast from "react-hot-toast";
import { useRobotsContext } from "~~/context/RobotsContext";
import { Plan, TokenAddress, tokenAddressMap } from "~~/context/Types";
import { useBBContractReads } from "~~/hooks/Botblock";
import { ContractNames } from "~~/hooks/Botblock/hooksUtils";
import BlackGrungeImage from "~~/public/assets/images/black-grunge.png";
import { palette } from "~~/styles/colors";
import { Button, Input, Text } from "~~/ui";

const ScribbleIcon = dynamic<SVGProps<any>>(() => import("~~/public/assets/icons/scribble.svg"));

const Header = () => {
  return (
    <div className="flex flex-row justify-between items-center px-12 py-6 border-b-gray-500 border-b-2">
      <Text type="p-lg">BotBlock | by Keyko powered by NVM</Text>
      <ConnectButton.Custom>
        {({ account, chain, openConnectModal, mounted }) => {
          const connected = mounted && account && chain;
          return connected ? (
            // TODO: tweak this UI
            <Text>Connected</Text>
          ) : (
            <Button onClick={openConnectModal} color="ternary" icon="plus" size="sm">
              Log In
            </Button>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
};

const Title = () => {
  return (
    <div className="flex flex-col justify-center items-center py-60" style={{ flex: 1 }}>
      <div className="w-2/3">
        <Text type="h1" style={{ marginBottom: "30px", textAlign: "center" }}>
          Get paid for your content by AI crawlers
        </Text>
        <Text type="subheading" style={{ textAlign: "center" }}>
          With BotBlock you can protect your site from AI crawlers from getting your content for their datasets. When
          your site is protected, you can create a subscription plan for AI companies to pay for access in just a couple
          of clicks!
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
    <div className="flex flex-col mb-12">
      <div className="mx-12 flex flex-row justify-start items-center">
        <ScribbleIcon color={palette.turquoise[100]} />
        <Text type="h2">Protect your site from bots</Text>
      </div>
      <div className="flex flex-col justify-center items-center bg-white p-12 gap-4">
        <Text>{`Enter your site's URL`}</Text>
        <Input
          label="URL"
          value={url}
          disabled={isLoading}
          placeholder="https://www.example.com"
          onChange={e => setUrl(e.currentTarget.value)}
          onKeyDown={e => e.key === "Enter" && handleOnSubmit()}
        />
      </div>
    </div>
  );
};

const SubscriptionOverviewSection = () => {
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>();
  const { allPlans } = useBBContractReads({ contractName: ContractNames.BOTBLOCK });

  useEffect(() => {
    // Just take the first 5 plans for now
    setPlans((allPlans as Plan[]).slice(0, 5));
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
    <div className="mx-12 flex flex-col mb-12">
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

const Body = () => {
  return (
    <div
      className="flex flex-col"
      style={{ flex: 3, backgroundImage: `url("${BlackGrungeImage.src}")`, backgroundSize: "cover" }}
    >
      <Header />
      <Title />
      <ProtectSection />
      <SubscriptionOverviewSection />
    </div>
  );
};

const Footer = () => {
  return (
    <div
      className="flex flex-col px-12 justify-center items-center"
      style={{ flex: 1, backgroundColor: palette.slate[100] }}
    >
      <div style={{ height: "440px" }}>
        <Text color="light">Footer</Text>
      </div>
    </div>
  );
};

export const Landing = () => {
  return (
    <div className="flex flex-col" style={{ flex: 4, height: "100%" }}>
      <Body />
      <Footer />
    </div>
  );
};
