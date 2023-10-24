"use client";

import NavLink from "@/components/ui/NavLink";

import { useState } from "react";
import { useEffect } from "react";


import { getDictionary } from "@/get-dictionary";
import Spinner from "@/components/ui/Spinner/Spinner";


const page = ({params: { lang }}) => {

      const [dictionary, setDictionary] = useState(null);

    // Helper function to load and set the dictionary
    const loadDictionary = async () => {
        const dictionaryData = await getDictionary(lang); // Assuming getDictionary is an asynchronous function
        setDictionary(dictionaryData.contactUsPage);
      };
  
      useEffect(() => {
        // Load the dictionary when the component mounts or lang changes
        loadDictionary();
      }, [lang]);
  
      
  const contactMethods = [
    {
      icon: (
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
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
      ),
      contact: "Hdessie250@gmail.com",
    },
    {
      icon: (
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
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
          />
        </svg>
      ),
      contact: "+251 945 522 598",
    },
    {
      icon: (
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
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
      ),
      contact: "Addis Ababa, Ethiopia",
    },
  ];

  if (!dictionary) {
    return <Spinner />; // You can replace this with a loading indicator or other UI
  }

  return (
    <main className="py-14">
    <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
      <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none">
        <div className="max-w-lg space-y-3">
          <h3 className="text-primary-dark dark:text-zinc-200 font-semibold">
            {dictionary.pageTitle}
          </h3>
          <p className="text-gray-800 dark:text-zinc-200 text-3xl font-semibold sm:text-4xl">
            {dictionary.mainHeading}
          </p>
          <p className="dark:text-zinc-300">{dictionary.paragraph}</p>
          <div>
            <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-6 items-center dark:text-zinc-300">
              {contactMethods.map((item, idx) => (
                <li key={idx} className="flex items-center gap-x-3">
                  <div className="flex-none text-gray-400">{item.icon}</div>
                  <p>{item.contact}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex-1 mt-12 sm:max-w-lg lg:max-w-md">
          <p className="text-gray-800 dark:text-zinc-200 mb-5 text-xl font-semibold sm:text-2xl">
            {dictionary.contributionHeading}
          </p>

          <NavLink className="text-white bg-violet-400 mb-10" href={"https://github.com/blackmammoth/agar-assistant-public"}>
            {dictionary.checkGitHubRepository}
          </NavLink>
          <p className="mt-5 font-semibold">
            {dictionary.translationOpportunity}
          </p>
          <p className="font-bold mt-5">{dictionary.contactInfo}</p>
        </div>
      </div>
    </div>
  </main>
  );
};

export default page;
