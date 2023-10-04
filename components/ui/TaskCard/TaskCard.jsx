// add checkbox here

import Link from "next/link";


const TaskCard = ({ task, lang, isLoading }) => {
  
  return (
    <Link href={`/${lang}/tasks/${task._id}`}>
      <div
        className={`max-w-lg p-4 rounded-2xl mb-5 mt-5 shadow-lg ${
          task.status ? "bg-completedTask" : "bg-remainingTask"
        }`}
        style={{ display: "flex", alignItems: "center" }}
      >
        {/* Task content */}
        <div className={`flex-1 ${task.status ? "line-through" : ""}`}>
          <p className="text-zinc-700 text-xl dark:text-slate-100">
            {task.taskName}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default TaskCard;

