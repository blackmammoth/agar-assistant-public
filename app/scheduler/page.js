"use client";

import SchedulerComponent from "@/components/ui/Syncfusion/Scheduler";
import { useState } from "react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const page = () => {
  
  const { data: session } = useSession();
  const [data, setData] = useState([]);

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

  return (
    <>
      <h1 className="text-2xl text-primary-dark dark:text-zinc-200 font-secondary font-bold sm:text-2xl mb-5">
        Your Schedule
      </h1>
      <SchedulerComponent scheduleData={data} />
    </>
  );
};

export default page;
