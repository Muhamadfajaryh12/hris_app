"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { addMonths, getDaysInMonth, subMonths } from "date-fns";

const SummaryAttendence = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentMonthName, setCurrentMonthName] = useState();
  const [dates, setDates] = useState([]);
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Doe",
      position: "Developer",
      attendance: {
        "1-6": "present", // ✓
        "2-6": "absent", // x
        "3-6": "permit", // x
      },
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Designer",
      attendance: {},
    },
    {
      id: 3,
      name: "Robert Johnson",
      position: "Manager",
      attendance: {
        "5-6": "present",
        "6-6": "permit",
      },
    },
  ]);

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

  useEffect(() => {
    setCurrentMonthName(monthName[currentMonth.getMonth()]);
    const daysInMonth = getDaysInMonth(currentMonth);
    setDates(Array.from({ length: daysInMonth }, (_, i) => i + 1));
  }, [currentMonth]);

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const getAttendanceSymbol = (employee, date) => {
    const monthDate = `${date}-${currentMonth.getMonth() + 1}`;
    const status = employee.attendance[monthDate];

    if (status === "present") return "✓";
    if (status === "permit" || status === "absent") return "x";
    return "";
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
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="border p-2">{employee.name}</td>
              {dates?.map((date) => (
                <td className="border p-2" key={date}>
                  {getAttendanceSymbol(employee, date)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SummaryAttendence;
