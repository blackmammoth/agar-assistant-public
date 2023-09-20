"use client";

import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

import Line from "@/components/ui/Charts/Line";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function page() {

  const { data: session } = useSession();
  const [stats, setStats] = useState([]);

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

  const subjectOptions = ["Amharic", "English", "Physics", "Chemistry", "Math"];

  return (
    // Wrap the page in similar fashin to SectionWrapper
    <>
      {/* Heading Component Create */}
      <h1 className="text-2xl text-primary-dark dark:text-zinc-200 font-secondary font-bold sm:text-2xl">
        Your Stats
      </h1>


      {/* Chart Component Create - Contains a Dropdown */}
        {/* <Line /> */}
        <Line stats={stats} key={stats._id} selectedValueObject={selectedValueObject} data={subjectOptions}/>

      {/* Add Button */}
      <div className="flex place-content-end mr-5 mt-5">
        <Link href={"/stats/new"} prefetch>
          <Button className="block w-auto text-white font-primary bg-primary dark:bg-sky-500 hover:bg-primary-light dark:hover:bg-sky-600 ring-offset-2 ring-blue-600 dark:ring-sky-500 focus:ring shadow rounded-lg">
            Add
          </Button>
        </Link>
      </div>

      {/* Exam Scores--Create Card component to wrap with, Create Pagination Component */}
      <h2 className="text-xl text-black font-secondary dark:text-zinc-200 font-medium sm:text-xl mt-5">
        Exam Scores
      </h2>
      <Card stats={stats} key={stats._id} data={subjectOptions} filterBy={"Exam"}/>

      {/* Assignment Results--Create Card component to wrap with, Create Pagination Component */}
      <h2 className="text-xl font-secondary font-medium sm:text-xl mt-5">
        Assignment Results
      </h2>
      <Card stats={stats} key={stats._id} data={subjectOptions} filterBy={"Assignment"}/>
    </>
  );
}
