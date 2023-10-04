// SignInRedirect.jsx
"use client";

import Button from "@/components/ui/Button";
import { signIn } from "next-auth/react";

import { useState,useEffect } from "react";
import { getDictionary } from "@/get-dictionary";
import Spinner from "@/components/ui/Spinner/Spinner";

const SignInRedirect = ({ lang }) => {
  const [dictionary, setDictionary] = useState(null);

  // Helper function to load and set the dictionary
  const loadDictionary = async () => {
    const dictionaryData = await getDictionary(lang); // Assuming getDictionary is an asynchronous function
    setDictionary(dictionaryData.redirectPage);
  };

  useEffect(() => {
    // Load the dictionary when the component mounts or lang changes
    loadDictionary();
  }, [lang]);

  // Wait until dictionary is loaded before rendering content
  if (!dictionary) {
    return <Spinner />; // You can replace this with a loading indicator or other UI
  }

  return (
    <div className="text-center mt-10">
      <p className="text-lg text-primary-dark font-primary">
        {dictionary.title}
      </p>
      <a>
        <Button
          onClick={() => signIn("google", { callbackUrl: `/${lang}/tasks` })}
          className="mt-4 text-white font-primary bg-primary dark:bg-sky-500 hover:bg-primary-light dark:hover:bg-sky-600 ring-offset-2 ring-blue-600 dark:ring-sky-500 focus:ring shadow rounded-lg"
        >
          {dictionary.signIn}
        </Button>
      </a>
    </div>
  );
};

export default SignInRedirect;
