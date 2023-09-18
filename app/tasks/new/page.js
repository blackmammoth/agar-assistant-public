"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";


const NewTask = () => {

  const {data: session} = useSession();
  
  const defaultTask = {
    taskName: "",
    status: false,
    dueDate: "",
    userId: session?.user?.id
  };

  const [newTask, setNewTask] = useState(defaultTask);

  const params = useParams();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);


  
  const getTask = async () => {
    const res = await fetch(`/api/tasks/${params.id}`,{ next: { revalidate: 20 } });
    const data = await res.json();


      // Parse ISO 8601 formatted date into a JavaScript Date object
  const dueDate = data.dueDate ? new Date(data.dueDate) : null;

  // Format the date to "yyyy-mm-dd" format
  const formattedDueDate = dueDate ? dueDate.toISOString().split('T')[0] : '';


    setNewTask({
      ...newTask,
      taskName: data.taskName,
      dueDate: formattedDueDate,
      status: data.status,
    });
  };

  useEffect(() => {
    if (params.id) {
      getTask();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);


    if (params.id) {
      await updateTask();
    } else {
      await createTask();
    }

    router.push("/tasks");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };


  const createTask = async () => {
    try {
      console.log(newTask)
      await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      router.push("/tasks");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const res = await fetch(`/api/tasks/${params.id}`, {
          method: "DELETE",
        });
        router.push("/tasks");
        router.refresh();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateTask = async () => {
    try {
      await fetch(`/api/tasks/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      router.push("/tasks");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  console.log("Session")
  console.log(session)
  return (
    <div className="min-h-[calc(100vh-7rem)] flex justify-center items-center custom-screen">
      <form onSubmit={handleSubmit}>
        <header className="flex justify-between">
          <h1 className="text-2xl">
            {!params.id ? "Create Task" : "Update task"}
          </h1>
          {params.id && (
            <button
              className="bg-red-500 px-3 py-1 rounded-md"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </header>
        
        <textarea
          type="text"
          placeholder="What's the task?"
          name="taskName"
          onChange={handleChange}
          value={newTask.taskName}
          autoFocus
          className="border-2 w-full p-4 rounded-lg my-4"
          rows={3}
          required
        ></textarea>

        <input
          type="checkbox"
          className="h-5 w-5 rounded border-gray-300"
          onChange={() => {
            setNewTask({
              ...newTask,
              status: !newTask.status,
            });
          }}
          checked={newTask.status}
        />
        <label className="ml-4" name="status">
          Task Completed
        </label>

        <input
          type="date"
          name="dueDate"
          placeholder="Enter Due Date"
          onChange={handleChange}
          value={newTask.dueDate}
          className="border-2 w-full p-4 rounded-lg my-4"
          required
        />

        <button className="bg-green-600 text-white font-semibold px-8 py-2 rounded-lg">
          {(params.id && isSubmitting) ? "Updating" 
          : params.id ? "Update": 
          isSubmitting ? "Saving" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default NewTask;
