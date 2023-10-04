"use client";

import SchedulerComponent from "@/components/ui/Syncfusion/Scheduler";
import { useState } from "react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

import { getDictionary } from "@/get-dictionary";
import Spinner from "@/components/ui/Spinner/Spinner";

import SignInRedirect from "@/components/ui/SignInRedirect/SignInRedirect";


import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
registerLicense('Ngo9BigBOggjHTQxAR8/V1NGaF1cXGFCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdgWXZccHVURWhYUUF/XUE=');



const page = ({ params: { lang } }) => {
  const { data: session } = useSession();
  const { status } = useSession();
  const [data, setData] = useState([]);
  const [dictionary, setDictionary] = useState(null);

  const fetchScheduleData = async () => {
    const res = await fetch("/api/scheduler");
    const data = await res.json();

    setData(data);
  };

  useEffect(() => {
    if (session) {
      fetchScheduleData();
    }
  }, [session?.user.id]);

  // Helper function to load and set the dictionary
  const loadDictionary = async () => {
    const dictionaryData = await getDictionary(lang); // Assuming getDictionary is an asynchronous function
    setDictionary(dictionaryData.schedulePage);
  };

  useEffect(() => {
    // Load the dictionary when the component mounts or lang changes
    loadDictionary();
  }, [lang]);

  if (status === "loading") {
    // Session is still loading, do nothing or show a loading indicator
    return <Spinner />;
  }

  if (!dictionary) {
    return <Spinner />; // You can replace this with a loading indicator or other UI
  }

  if (!session) {
    return <SignInRedirect lang={lang}/>;
  }

  return (
    <>
      <h1 className="text-2xl text-primary-dark dark:text-zinc-200 font-secondary font-bold sm:text-2xl mb-5">
        {dictionary.schedulePageTitle}
      </h1>
      <SchedulerComponent scheduleData={data} />
    </>
  );
};

export default page;
