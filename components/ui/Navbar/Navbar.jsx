"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Brand from "../Brand";
import { signOut, useSession } from "next-auth/react";
import LocaleSwitcher from "@/components/ui/LocaleSwitcher";
import { signIn } from "next-auth/react";


// Lazy Imports

const DynamicDarkModeHandler = dynamic(() =>
  import("../DarkModeHandler/DarkModeHandler")
);

const Navbar = ({ lang, dictionary }) => {
  const menuBtnEl = useRef();
  const [state, setState] = useState(false);

  const isLightNeeded = false;
  // Method to add custom color based on the path
  const addColor = (lightColor, darkColor) =>
    isLightNeeded ? lightColor : darkColor;

  // Navbar background color config
  const bgColor = addColor("bg-white", "bg-gray-900");
  // Brand Color config
  const brandColor = addColor("text-gray-900", "text-white");
  // Navigation links color config
  const navLinkColor = addColor(
    "text-gray-700 hover:text-blue-600 md:text-gray-600",
    "text-gray-200 hover:text-sky-500"
  );
  // Navbar menu nutton config
  const navMenuBtnColor = addColor(
    "text-gray-500 hover:bg-gray-50",
    "text-gray-400 hover:bg-gray-800"
  );

  const navigation = [
    // { id: 1, name: "Dashboard", href: "/dashboard" },
    { id: 2, name: dictionary?.stats, href: `/${lang}/stats` },
    { id: 3, name: dictionary?.tasks, href: `/${lang}/tasks` },
    { id: 4, name: dictionary?.scheduler, href: `/${lang}/scheduler` },
    { id: 5, name: dictionary?.contactUs, href: `/${lang}/contact-us` },
  ];

  useEffect(() => {
    // Close the navbar menu when click outside the menu button or when scroll
    document.onclick = (e) => {
      const target = e.target;
      if (menuBtnEl.current && !menuBtnEl.current.contains(target))
        setState(false);
    };
    window.onscroll = () => setState(false);
  }, []);

  // For acessing user session
  const { status } = useSession();

  // Define a state variable to track whether the user is authenticated
  const isAuthenticated = status === "authenticated";

  const DarkModeBtn = () => (
    <DynamicDarkModeHandler
      className={`dark:text-sky-500 ${addColor(
        "text-blue-600 hover:bg-gray-50",
        "text-sky-500 hover:bg-gray-800"
      )}`}
    />
  );

  return (
    <header>
      <nav
        className={`${bgColor} dark:bg-gray-900 w-full md:static md:text-sm sticky ${
          state ? "relative z-20" : ""
        }`}
      >
        <div className="custom-screen relative items-center mx-auto md:flex">
          <div className="flex items-center justify-between py-3 md:py-10 md:block">
            <Link href={isAuthenticated ? `/${lang}/tasks` : `/${lang}`} aria-label="Logo">
              <Brand className={`text-white ${brandColor}`} />
            </Link>
            <div className="flex gap-x-3 items-center md:hidden">
              <div className="mx-auto space-y-6">
                <LocaleSwitcher />
              </div>
              <DarkModeBtn />
              <button
                ref={menuBtnEl}
                role="button"
                aria-label={dictionary?.menuButtonAriaLabel}
                className={`p-2 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 ${navMenuBtnColor}`}
                onClick={() => {
                  setState((prev) => !prev);
                }}
              >
                {state ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div
            className={`${bgColor} dark:bg-gray-900 flex-1 md:py-0 md:block md:static md:z-0 ${
              state ? "absolute z-20 inset-x-0 px-4 py-6 w-full" : "hidden"
            }`}
          >
            <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0 md:font-medium">
              {navigation.map((item) => {
                if (!isAuthenticated && item.name !== (dictionary?.contactUs)) {
                  return null;
                }
                return (
                  <li
                    key={item.id} // Use a unique identifier as the key
                    className={`${navLinkColor} dark:text-gray-200 dark:hover:text-sky-500 duration-150`}
                  >
                    <Link href={item.href} className="block" scroll={false}>
                      {item.name}
                    </Link>
                  </li>
                );
              })}
              <li>
                <div className="mx-auto space-y-6 hidden md:block">
                  <LocaleSwitcher />
                </div>
              </li>
              <li className="hidden md:block">
                <DarkModeBtn />
              </li>
              <li>
                {isAuthenticated ? (
                  <button
                    onClick={() => signOut({ callbackUrl: `/${lang}` })}
                    className="py-2.5 px-4 text-center duration-150 flex items-center justify-center gap-x-1 font-medium text-sm text-white bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full"
                  >
                    {dictionary?.signOut}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={() => signIn("google", { callbackUrl: `/${lang}/tasks`})}
                    className="py-2.5 px-4 text-center duration-150 flex items-center justify-center gap-x-1 font-medium text-sm text-white bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full"
                  >
                    {dictionary?.signUp}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
