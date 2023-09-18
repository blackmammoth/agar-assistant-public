"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

const navigation = [
  // { id: 1, name: "Dashboard", href: "/dashboard" },
  { id: 2, name: "Stats", href: "/stats" },
  { id: 3, name: "Tasks", href: "/tasks" },
  { id: 4, name: "Scheduler", href: "/scheduler" },
  { id: 5, name: "Contact", href: "/contact-us" },
  { id: 6, name: "Privacy Policy", href: "/other/privacy-policy" },
];

const Footer = () => {
  //   For acessing user session
  const { status } = useSession();

  return (
    <footer className="bottom-0">
      <div className="custom-screen text-gray-600 dark:text-gray-300">
        <div className="mt-10 py-10 border-t dark:border-gray-800 flex-row-reverse items-center justify-between sm:flex">
          <ul className="flex flex-wrap items-center gap-4 sm:text-sm">
            {navigation.map((item) => {
              if (status !== "authenticated" && item.name !== "Contact") {
                return null;
              }

              return (
                <li
                  key={item.id}
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-sky-500 duration-150 md:font-medium"
                >
                  <Link href={item.href}>{item.name}</Link>
                </li>
              );
            })}
            <li
              key={navigation[4].id}
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-sky-500 duration-150 md:font-medium"
            >
              <Link href={navigation[4].href}>{navigation[4].name}</Link>
            </li>
          </ul>
          <p className="mt-6 sm:mt-0">
            © 2023 Agar Assistant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
