'use client';
import { signIn } from "next-auth/react";

import NavLink from "../NavLink";
import GradientWrapper from "../../GradientWrapper";

const Hero = ({ dictionary, lang }) => {
  return (
    <GradientWrapper>
      <div className="custom-screen items-center gap-12 text-gray-600 flex flex-col sm:justify-center sm:text-center xl:flex-row xl:text-left">
        <div className="flex-none space-y-5 max-w-4xl xl:max-w-2xl">
          <h1 className="text-4xl text-white font-extrabold sm:text-6xl">
            {dictionary?.title}
          </h1>
          <p className="text-gray-300 max-w-xl sm:mx-auto xl:mx-0">
            {dictionary?.subtitle}
          </p>
          <div className="items-center gap-x-3 font-medium text-sm sm:flex sm:justify-center xl:justify-start">
            <button
              type="button"
              key={"google"}
              onClick={() => signIn("google", { callbackUrl: `/${lang}/tasks` })}
              className="py-2.5 px-4 text-center rounded-lg duration-150 block text-white bg-sky-500 hover:bg-sky-600 active:bg-sky-700"
            >
              {dictionary?.getStartedButton}
            </button>
          </div>
        </div>
        <div className="flex-1 w-full sm:max-w-2xl xl:max-w-xl">
          <div className="relative">
            {/* <Image src={heroThumbnail} className="rounded-lg w-full" alt="IO Academy" loading="lazy"/> */}
          </div>
        </div>
      </div>
    </GradientWrapper>
  );
};

export default Hero;
