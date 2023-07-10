import Link from "next/link";
import { Balancer } from "react-wrap-balancer";

const Herosection = () => {
  return (
    <div className="relative isolate px-2 pb-24">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl pt-36">
        <div className="mb-8 px-2 max-w-sm justify-center items-start mx-auto text-center">
          <div className="relative rounded-full p-2 font-medium text-md  leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 text-center">
            <Balancer>
            Give it a ⭐ and contribute in this.{" "}
            <Link target="_blank" href="https://github.com/Abdullah-SoftDev/Promptify" className="font-semibold text-purple-600">
              <span className="absolute inset-0" aria-hidden="true" />
              Github <span aria-hidden="true">&rarr;</span>
            </Link>
            </Balancer>
          </div>
        </div>
        <div className="text-center">
          <h1 className="mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-center">
            <Balancer>
              Discover & Share
            </Balancer>
            <br className="max-md:hidden" />
            <span className="bg-gradient-to-r from-purple-500 via-pink-600 to-rose-500 bg-clip-text text-transparent text-center">
              {" "}
              <Balancer>
                AI-Powered Prompts
              </Balancer>
            </span>
          </h1>
          <p className="mt-7 text-lg text-gray-600 sm:text-xl max-w-2xl">
            <Balancer>
            Promptify is an open-source AI prompting tool for modern world to
            discover, create and share creative prompts.
            </Balancer>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Herosection;
