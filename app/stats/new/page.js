"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
//SearchSelect
import { SearchSelect, SearchSelectItem, TextInput } from "@tremor/react";
import { useSession } from "next-auth/react";


/// BUGS
// 1. handleSubmit needs to be clicked twoce

export default () => {
  const { data: session } = useSession();

  const [newStat, setNewStat] = useState({
    type: "",
    subject: "",
    score: null,
    outOf: null,
    date: null,
    userId: session?.user?.id,
  });

  const [user, setUser] = useState({
      _id: session?.user?.id,
      email: session?.user?.email,
      subjects: []
  })


  const typeOptions = ["Exam", "Assignment", "Quiz"];
  const [subjectOptions, setSubjectOptions] = useState(session?.user?.subjects || []); 

  useEffect(() => {
    if (session?.user?.subjects) {
      setSubjectOptions(session.user.subjects);
    }
  }, [session]);

  const [typeValue, setTypeValue] = useState("");
  const [subjectValue, setSubjectValue] = useState("");
  const [showTextInput, setShowTextInput] = useState(false); // Track whether to show TextInput
  const [newSubject, setNewSubject] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (subjectValue === subjectOptions.length) {
      setShowTextInput(true);
    } else {
      setShowTextInput(false);
    }
  }, [subjectValue]);

  const postNewSubject = async () => {
    const updatedUser = { ...user, subjects: [...subjectOptions, newSubject] };
    setUser(updatedUser); 

    try {
      await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});



  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedSubject = newSubject
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase()); // Format to Capitalized


    setNewStat({
      ...newStat,
      type: typeOptions[typeValue - 1],
      subject:
        subjectOptions[subjectValue - 1] === "Other"
          ? formattedSubject
          : subjectOptions[subjectValue - 1],
    });

    let errs = validate();

    if (Object.keys(errs).length) return setErrors(errs);
    setIsSubmitting(true);

    await createStat();

    if (subjectOptions[subjectValue - 1] === "Other") {
      await postNewSubject();
    }

    router.push("/stats");
  };

  const handleChange = (e) => {
    setNewStat({ ...newStat, [e.target.name]: parseInt(e.target.value, 10) });
  };

  const validate = () => {
    let errors = {};

    if (!newStat.type) {
      errors.type = "Type is required";
      console.log("Error Here");
    }
    if (!newStat.score) {
      errors.score = "Score is required";
    }

    if (!newStat.outOf) {
      errors.outOf = "Score Out OF is required";
    }

    if (!newStat.subject) {
      errors.description = "Subject is required";
    }
    return errors;
  };

  const createStat = async () => {
    try {
      await fetch("/api/stats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStat),
      });
      router.push("/stats");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto text-white">
      <div className="flex items-center px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-primary-light rounded-md shadow-lg">
          <div className="flex justify-end">
            <Link href={"/stats"}>
              <button className="p-2 text-white rounded-md hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mx-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </Link>
          </div>
          <div className="max-w-sm mx-auto py-3 space-y-3 text-left">
            <h4 className="text-lg font-medium text-white">Add</h4>
            <form onSubmit={handleSubmit}>
              <label className="text-[15px] text-white">Select Type</label>

              {/* Tremor Library for dropdown modified a little */}
              <div className="max-w-sm mx-auto space-y-6">
                <SearchSelect value={typeValue} onValueChange={setTypeValue}>
                  {typeOptions.map((label, index) => (
                    <SearchSelectItem key={index} value={index + 1}>
                      {label}
                    </SearchSelectItem>
                  ))}
                </SearchSelect>
              </div>

              <label className="text-[15px] text-white">Select Subject</label>

              {/* Tremor Library for dropdown modified a little */}
              <div className="max-w-sm mx-auto space-y-6">
                <SearchSelect
                  value={subjectValue}
                  onValueChange={setSubjectValue}
                >
                  {subjectOptions.map((label, index) => (
                    <SearchSelectItem key={index} value={index + 1}>
                      {label}
                    </SearchSelectItem>
                  ))}
                </SearchSelect>
              </div>

              {showTextInput && (
                <div className="max-w-sm mx-auto space-y-6 mt-5 mb-5">
                  <TextInput
                    name="newSubject"
                    placeholder="Enter New Subject"
                    // value={subjectOptions[subjectValue - 1]}
                    value={newSubject}
                    onChange={(e) => {setNewSubject(e.target.value)}}
                  />
                </div>
              )}

              <label className="text-[15px] text-white">Result</label>
              <div className="relative">
                <div className="flex flex-row">
                  <input
                    type="number"
                    placeholder="--"
                    name="score"
                    onChange={handleChange}
                    className="w-full pl-12 pr-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                  <p className="mr-2 font-extrabold ml-2">/</p>
                  <input
                    type="number"
                    name="outOf"
                    placeholder="--"
                    onChange={handleChange}
                    className="w-full pl-12 pr-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
              >
                {isSubmitting ? "Adding Result" : "Add"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
