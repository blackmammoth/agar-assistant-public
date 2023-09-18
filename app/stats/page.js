import dynamic from "next/dynamic";

import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

// Dynamic Imports
const Line = dynamic(() => import('@/components/ui/Charts/Line'), { ssr: false });
const Button = dynamic(() => import("@/components/ui/Button/Button"), { ssr: false });
const Card = dynamic(() => import("@/components/ui/Card/Card"), { ssr: false })


async function loadStats() {
  try {
    const res = await import("../api/stats/route");
    const data = await (await res.GET()).json();
    return data;
  } catch (error) {
    // Handle the error here, you can log it or perform other actions
    console.error("Error loading stats:", error);
    throw error; // Re-throw the error to propagate it to the caller if needed
  }
}


export default async function page() {

  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>You Are Not Signed In</p>
  }

  const stats = await JSON.parse(JSON.stringify(await loadStats()));
  
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
