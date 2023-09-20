"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import SectionWrapper from "@/components/SectionWrapper";
import { useState } from "react";
import { useEffect } from "react";

import TaskCard from "@/components/ui/TaskCard";
import Button from "@/components/ui/Button";

// Helper function to categorize tasks by their due dates
function categorizeTasksByDueDate(tasks) {
  console.log("Inside Categorize: ");
  console.log(tasks);
  console.log("Before Log");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const todayISO = today.toISOString().split("T")[0];
  const tomorrowISO = tomorrow.toISOString().split("T")[0];
  const pastDueTasks = [];
  const todayTasks = [];
  const tomorrowTasks = [];
  const futureTasks = {};
  const longDueTasks = [];
  tasks.forEach((task) => {
    const dueDate = task.dueDate ? new Date(task.dueDate) : null;
    if (dueDate) {
      dueDate.setHours(0, 0, 0, 0);
      const formattedDueDate = dueDate.toISOString().split("T")[0];
      if (formattedDueDate === todayISO) {
        todayTasks.push(task);
      } else if (formattedDueDate === tomorrowISO) {
        tomorrowTasks.push(task);
      } else {
        // Calculate the difference in days from today
        const timeDifference = Math.floor(
          (dueDate - today) / (1000 * 60 * 60 * 24)
        );
        // Determine the category for the task based on the difference in days
        if (timeDifference >= 0 && timeDifference <= 4) {
          // The task is due within the next 5 days
          if (!futureTasks[timeDifference]) {
            futureTasks[timeDifference] = [];
          }
          futureTasks[timeDifference].push(task);
        }
        if (timeDifference >= 5) {
          // Check if the task is due in 5 days or more
          longDueTasks.push(task);
        }
        if (dueDate < today) {
          pastDueTasks.push(task);
        }
      }
    }
  });
  // Sort future tasks by their due date categories
  const sortedFutureTasks = Object.keys(futureTasks)
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map((key) => ({
      category: `In ${parseInt(key)} days`,
      tasks: futureTasks[key],
    }));
  // Sort long-due tasks by their due date
  longDueTasks.sort((a, b) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    return dateA - dateB;
  });
  // Sort past due tasks by their due date
  pastDueTasks.sort((a, b) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    return dateA - dateB;
  });
  return {
    pastDueTasks,
    todayTasks,
    tomorrowTasks,
    futureTasks: sortedFutureTasks,
    longDueTasks,
  };
}


export default function page() {
  const [tasks, setTasks] = useState([]);
  const [categorizedTasks, setCategorizedTasks] = useState(null); // Initialize as null
  const { data: session } = useSession();

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();

    setTasks(data);
  };

  useEffect(() => {
    if (session) {
      fetchTasks();
    }
  }, [session?.user.id]);

  useEffect(() => {
    if (tasks.length > 0) {
      // Categorize tasks after they have been fetched and set
      const categorizedTasksResult = categorizeTasksByDueDate(tasks);
      console.log(categorizedTasksResult);
      setCategorizedTasks(categorizedTasksResult); // Store categorized tasks in state
    }
  }, [tasks]);

  // const tasks = await JSON.parse(JSON.stringify(await loadTasks()));
  // const categorizedTasks = categorizeTasksByDueDate(tasks);
  // console.log("Tasks: ");
  // console.log(tasks);
  return (
    <SectionWrapper className="custom-screen">
      <h1 className="text-2xl text-primary-dark dark:text-zinc-200 font-secondary font-bold sm:text-2xl">
        Tasks
      </h1>
      <Link href={"/tasks/new"} prefetch>
        <Button className="float-right text-white font-primary bg-primary dark:bg-sky-500 hover:bg-primary-light dark:hover:bg-sky-600 ring-offset-2 ring-blue-600 dark:ring-sky-500 focus:ring shadow rounded-lg">
          Add Task
        </Button>
      </Link>
      <div className="block grid-cols-2 sm:grid">
        {/* New "Past Due Tasks" section */}
        {categorizedTasks && categorizedTasks.pastDueTasks?.length > 0 && (
          <div className="mr-8">
            <h2 className="text-2xl text-primary-dark font-primary dark:text-slate-100 font-light sm:text-xl mt-5">
              Past Due Tasks
            </h2>
            {categorizedTasks.pastDueTasks.map((task) => (
              <TaskCard task={task} key={task._id} />
            ))}
          </div>
        )}
        <div className="mr-8">
          <h2 className="text-2xl text-primary-dark dark:text-slate-100 font-primary font-light sm:text-xl mt-5">
            Today
          </h2>
          {categorizedTasks &&
            (categorizedTasks.todayTasks.length === 0 ? (
              <p>No tasks available for today.</p>
            ) : (
              categorizedTasks.todayTasks.map((task) => (
                <TaskCard task={task} key={task._id} />
              ))
            ))}
        </div>
        <div className="mr-8">
          <h2 className="text-2xl text-primary-dark font-primary dark:text-slate-100 font-light sm:text-xl mt-5">
            Tomorrow
          </h2>
          {categorizedTasks &&
            (categorizedTasks.tomorrowTasks.length === 0 ? (
              <p>No tasks available for tomorrow.</p>
            ) : (
              categorizedTasks.tomorrowTasks.map((task) => (
                <TaskCard task={task} key={task._id} />
              ))
            ))}
        </div>
        {/* Display tasks due in the next 5 days */}
        {categorizedTasks &&
          categorizedTasks.futureTasks.map((category) => (
            <div key={category.category}>
              <h2 className="text-2xl text-primary-dark font-primary dark:text-slate-100 font-light sm:text-xl mt-5">
                {category.category}
              </h2>
              {category.tasks.map((task) => (
                <TaskCard task={task} key={task._id} />
              ))}
            </div>
          ))}
        {/* New "Long Due Tasks" section */}
        <div className="mr-8">
          <h2 className="text-2xl text-primary-dark font-primary dark:text-slate-100 font-light sm:text-xl mt-5">
            Long Due Tasks
          </h2>
          {categorizedTasks &&
            (categorizedTasks.longDueTasks.length === 0 ? (
              <p>No long-due tasks available.</p>
            ) : (
              categorizedTasks.longDueTasks.map((task) => (
                <TaskCard task={task} key={task._id} />
              ))
            ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
