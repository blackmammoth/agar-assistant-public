import SchedulerComponent from "@/components/ui/Syncfusion/Scheduler";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"

async function loadSchedule() {
  try {
    const res = await import("../api/scheduler/route");
    const data = await (await res.GET()).json();
    return data;
  } catch (error) {
    // Handle the error here, you can log it or perform other actions
    console.error("Error loading SCHEDULE:", error);
    throw error; // Re-throw the error to propagate it to the caller if needed
  }
}

const page = async () => {
  
  const session = await getServerSession(authOptions);

  if (!session) {
    return <></>
  }

  const data = await JSON.parse(JSON.stringify(await loadSchedule()));
  console.log(session);

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
