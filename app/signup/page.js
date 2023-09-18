"use client";

import Brand from "@/components/ui/Brand";
import GoogleIcon from "@/components/ui/Icons/GoogleIcon";
import { signIn, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

export default () => {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 dark:text-gray-300">
        <div className="text-center">
          {/* Make Ur Logo Here */}
          <Brand />
          <div className="mt-5 space-y-2">
            <h3 className="text-2xl font-bold sm:text-3xl">Sign In</h3>
            <p className=""> Login With Your Google Account </p>
          </div>
        </div>
        <>
          <button
            type="button"
            key={"google"}
            onClick={() => signIn("google", { callbackUrl: "/tasks" })}
            className="w-full flex items-center justify-center gap-x-3 py-2.5 mt-5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100"
          >
            <GoogleIcon className="text-xl"/>
            Continue with Google
          </button>
        </>
      </div>
    </main>
  );
};
