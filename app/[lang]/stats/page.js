"use client";

import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { getDictionary } from "@/get-dictionary";
import Spinner from "@/components/ui/Spinner/Spinner";

import SignInRedirect from "@/components/ui/SignInRedirect/SignInRedirect";


import Line from "@/components/ui/Charts/Line";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function page({ params: { lang } }) {
  const { data: session } = useSession();
  const { status } = useSession();
  const [stats, setStats] = useState([]);
  const [dictionary, setDictionary] = useState(null);

  const fetchStats = async () => {
    const res = await fetch("/api/stats");
    const data = await res.json();

    setStats(data);
  };

  useEffect(() => {
    if (session) {
      fetchStats();
    }
  }, [session?.user.id]);

  const selectedValueObject = {
    selected: "Amharic",
  };

  // const subjectOptions = ["Amharic", "English", "Physics", "Chemistry", "Math"];
  const [subjectOptions, setSubjectOptions] = useState(session?.user?.subjects || []); 

  useEffect(() => {
    if (session?.user?.subjects) {
      setSubjectOptions(session.user.subjects);
    }
  }, [session]);

  
  useEffect(() => {
    const loadDictionary = async () => {
      const dictionaryData = await getDictionary(lang);
      setDictionary(dictionaryData);
    };

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
      {/* Heading Component Create */}
      <h1 className="text-2xl text-primary-dark dark:text-zinc-200 font-secondary font-bold sm:text-2xl mt-10 sm:mt-0 mb-5">
        {dictionary.statsPage.pageTitle}
      </h1>

      {/* Chart Component Create - Contains a Dropdown */}
      <Line stats={stats} key={stats._id} selectedValueObject={selectedValueObject} data={subjectOptions} dictionary={dictionary.lineComponent} />

      {/* Add Button */}
      <div className="flex place-content-end mr-5 mt-5">
        <Link href={`/${lang}/stats/new`} prefetch>
          <Button className="block w-auto text-white font-primary bg-primary dark:bg-sky-500 hover:bg-primary-light dark:hover:bg-sky-600 ring-offset-2 ring-blue-600 dark:ring-sky-500 focus:ring shadow rounded-lg">
            {dictionary.statsPage.addButton}
          </Button>
        </Link>
      </div>

      {/* Exam Scores--Create Card component to wrap with, Create Pagination Component */}
      <h2 className="text-xl text-black font-secondary dark:text-zinc-200 font-medium sm:text-xl mt-5">
        {dictionary.statsPage.chartTitle}
      </h2>
      <Card stats={stats} key={stats._id} data={subjectOptions} filterBy={"Exam"} dictionary={dictionary.card} />

      {/* Assignment Results--Create Card component to wrap with, Create Pagination Component */}
      <h2 className="text-xl font-secondary font-medium sm:text-xl mt-5">
        {dictionary.statsPage.assignmentTitle}
      </h2>
      <Card stats={stats} key={stats._id} data={subjectOptions} filterBy={"Assignment"} dictionary={dictionary.card} />
    </>
  );
}
