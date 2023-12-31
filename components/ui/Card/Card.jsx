"use client";

import {
  Table,
  TableHead,
  TableHeaderCell,
  TableRow,
  MultiSelect,
  MultiSelectItem,
} from "@tremor/react";
import { useState, useEffect } from "react";
import { useMemo } from "react";
import TrashCan from "../Icons/TrashBin";
import { useRouter } from "next/navigation";

export default ({ stats, data, filterBy, dictionary }) => {  
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const monthNames = dictionary?.monthNames;

    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(undefined, options);

    const monthIndex = date.getMonth();
    const monthName = monthNames[monthIndex];

    return formattedDate.replace(
      date.toLocaleDateString(undefined, { month: "long" }),
      monthName
    );
  }

  const handleDelete = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this result?")) {
      try {
        const res = await fetch(`/api/stats/${itemId}`, {
          method: "DELETE",
        });
        
        window.location.reload(false)
      } catch (error) {
        console.error(error);
      }
    }
  };

  
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState([]);

  const defaultPageSize = 10;

  let filteredByType = stats.filter((item) => item.type === filterBy);

  let filteredData;

  let totalPages = Math.ceil(filteredByType.length / defaultPageSize);
  let startItem = (currentPage - 1) * defaultPageSize + 1;
  let endItem = Math.min(currentPage * defaultPageSize, filteredByType.length);
  let statsLength = filteredByType.length;

  const isSubjectSelected = (subject) =>
    selectedSubject.includes(subject) || selectedSubject.length === 0;

  function renderTableData() {
    const startIndex = (currentPage - 1) * defaultPageSize;
    const endIndex = startIndex + defaultPageSize;

    filteredData = useMemo(() => {
      return filteredByType.filter((item) => isSubjectSelected(item.subject));
    }, [filteredByType, selectedSubject]);

    if (filteredData.length === 0) {
      return (
        <tr className="text-lg">
          <td colSpan="3">{dictionary?.noStatsAvailable}</td>
        </tr>
      );
    }

    const chartData = filteredData
      .slice(startIndex, endIndex)
      .map((item, index) => {
        return (
          <TableRow key={index}>
            <TableHeaderCell className="text-left dark:text-zinc-200">
              {item.subject}
            </TableHeaderCell>
            <TableHeaderCell className="text-left dark:text-zinc-200">
              {item.score} / {item.outOf}
            </TableHeaderCell>
            <TableHeaderCell className="text-left dark:text-zinc-200">
              {formatDate(item.date)}
            </TableHeaderCell>
            <TableHeaderCell className="text-left dark:text-zinc-200">
              <button onClick={() => handleDelete(item._id)}>
                <TrashCan className="text-red-600 font-semibold" />
              </button>
            </TableHeaderCell>
          </TableRow>
        );
      });

    if (selectedSubject.length !== 0) {
      statsLength = filteredData.length;
      totalPages = Math.ceil(filteredData.length / defaultPageSize);
      endItem = Math.min(currentPage * defaultPageSize, filteredData.length);
    }

    return chartData;
  }

  function renderPagination() {
    if (!defaultPageSize) return null;

    return (
      <div className="flex justify-between items-center">
        <div>
          {dictionary?.showing} {startItem} – {endItem} {dictionary?.of}{" "}
          {statsLength}
        </div>
        <div className="flex">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l focus:outline-none"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            &larr; {dictionary?.prev}
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            {dictionary?.next} &rarr;
          </button>
        </div>
      </div>
    );
  }

  if (!dictionary) {
    return <Spinner />; // You can replace this with a loading indicator or other UI
  }

  return (
    <>
      <MultiSelect
        onValueChange={setSelectedSubject}
        placeholder={dictionary?.selectSubjects}
        className="max-w-xs mt-5"
      >
        {data.map((label, index) => (
          <MultiSelectItem key={index} value={label}>
            {label}
          </MultiSelectItem>
        ))}
      </MultiSelect>

      <div className="max-w-screen-xl mx-auto">
        <div className="mt-5 shadow-sm border rounded-lg overflow-x-auto">
          <Table className="w-full table-auto text-sm text-left">
            <TableHead className="bg-primary text-lg font-normal border-b">
              <TableRow className="ml-5">
                <TableHeaderCell className="text-left text-white dark:text-zinc-200">
                  {dictionary?.subject}
                </TableHeaderCell>
                <TableHeaderCell className="text-left text-white dark:text-zinc-200">
                  {dictionary?.result}
                </TableHeaderCell>
                <TableHeaderCell className="text-left text-white dark:text-zinc-200">
                  {dictionary?.date}
                </TableHeaderCell>
                <TableHeaderCell className="text-left text-white dark:text-zinc-200"></TableHeaderCell>
              </TableRow>
            </TableHead>
            <tbody className="text-gray-600 dark:text-zinc-200 divide-y">
              {renderTableData()}
            </tbody>
          </Table>
          {filteredData.length !== 0 && renderPagination()}
        </div>
      </div>
    </>
  );
};
