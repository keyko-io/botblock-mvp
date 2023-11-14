import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/ui/MetaHeader";

const Home: NextPage = () => (
  <>
    <MetaHeader />
    <div className="flex items-center flex-col flex-grow pt-10">
      <div className="px-5">
        <h1 className="text-center mb-8">
          <span className="block text-2xl mb-2">Welcome to</span>
          <span className="block text-4xl font-bold">Botblock</span>
        </h1>
        <p className="text-center text-lg">
          Powered by{" "}
          <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
            Nevermined
          </code>
        </p>
        <p className="text-center text-lg">Just get paid by big AI crawlers</p>
      </div>

      <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
        <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
          <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
            <BugAntIcon className="h-8 w-8 fill-secondary" />
            <p>
              Reference your website to Botblock by{" "}
              <Link href="/debug" passHref className="link">
                Creating a new subscription
              </Link>{" "}
              .
            </p>
          </div>
          <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
            <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
            <p>
              {" "}
              <Link href="/blockexplorer" passHref className="link">
                Explore
              </Link>{" "}
              what is inside Botblock.
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Home;
