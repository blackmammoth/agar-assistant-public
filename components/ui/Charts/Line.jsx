"use client";

import { Card, Title, LineChart } from "@tremor/react";
import Dropdown from "../Dropdown/Dropdown";
import { useState } from "react";
import { useMemo } from "react";

const dataFormatter = (number) =>
  `${Intl.NumberFormat("us").format(number).toString()}%`;

const Line = ({ stats, data, dictionary, typeOptions }) => {
  const [selectedSubject, setSelectedSubject] = useState("Amharic");

  const handleSubjectChange = (newSubject) => {
    setSelectedSubject(newSubject);
  };

  const chartData = useMemo(() => {
    return stats
      .filter((item) => item.subject === selectedSubject)
      .map((item) => {
        const date = new Date(item.date);
        const isValidDate = !isNaN(date);
        

        // Define an array of month names
        const monthNames = dictionary.monthNames

        // Format the date as "Month Day" (e.g., "Mar 24")
        const formattedDate = isValidDate
          ? `${monthNames[date.getMonth()]} ${date.getDate()}`
          : null;

        return {
          date: formattedDate,
          Exam: (item.type === "Exam" ? (item.score / item.outOf) * 100 : null),
          Assignment: (item.type === "Assignment" ? (item.score / item.outOf) * 100  : null),
        };
      });
  },  [stats, selectedSubject]);

  return (
    <>
      <Dropdown
        value={data.indexOf(selectedSubject) + 1}
        onValueChange={handleSubjectChange}
        data={data}
        placeholder={dictionary?.dropdownLabel}
      />
      <div>
        <Card className="mt-16">
          <Title>{dictionary?.title}</Title>
          <LineChart
            className="mt-6 w-auto flex mr-auto"
            data={chartData}
            index="date"
            categories={["Exam", "Assignment"]}
            colors={["emerald", "gray"]}
            valueFormatter={dataFormatter}
            yAxisWidth={40}
            connectNulls={true}
          />
        </Card>
      </div>
    </>
  );
};

export default Line;
