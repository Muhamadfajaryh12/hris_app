"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { addMonths, getDaysInMonth, getYear, subMonths } from "date-fns";
import AttendenceAPI from "@/data/AttendenceAPI";
import { FaCheck } from "react-icons/fa6";

const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SummaryAttendence = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonthName, setCurrentMonthName] = useState();
  const [dates, setDates] = useState([]);
  const [data, setData] = useState([]);

  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    setCurrentMonthName(monthName[currentDate.getMonth()]);
    const daysInMonth = getDaysInMonth(currentDate);
    setDates(Array.from({ length: daysInMonth }, (_, i) => i + 1));
    getData();
  }, [currentDate]);

  const getData = async () => {
    const response = await AttendenceAPI.GetSummaryAttendence({
      month: currentMonth,
      year: currentYear,
    });
    setData(response);
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const getAttendanceSymbol = (employee, date) => {
    const monthDate = `${date}-${currentDate.getMonth() + 1}`;
    const status = employee.attendance[monthDate];

    if (status === "On-Time")
      return (
        <div className=" flex justify-center p-2 bg-green-200 text-green-800 border border-green-800 rounded-md">
          <FaCheck />
        </div>
      );
    if (status === "Late")
      return (
        <div className=" flex justify-center p-2 bg-orange-200 text-orange-800 border border-orange-800 rounded-md">
          <FaCheck />
        </div>
      );
  };
  return (
    <div>
      <div className="flex justify-between items-center my-4">
        <Button onClick={handlePrevMonth}>PREV</Button>
        <h1 className="text-xl font-bold">{currentMonthName}</h1>
        <Button onClick={handleNextMonth}>NEXT</Button>
      </div>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Employee</th>
            {dates?.map((date) => (
              <th className="border p-2" key={date}>
                {date}
              </th>
            ))}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee) => (
            <tr key={employee.id}>
              <td className="border p-2">{employee.name}</td>
              {dates?.map((date) => (
                <td className="border p-2" key={date}>
                  {getAttendanceSymbol(employee, date)}
                </td>
              ))}
              <td className="border p-2 text-center">{employee.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SummaryAttendence;
