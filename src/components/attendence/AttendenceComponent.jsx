"use client";
import FullCalendar from "@fullcalendar/react";
import React, { useEffect, useRef, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import FormAttendenceComponent from "./FormAttendenceComponent";

const AttendenceComponent = ({ data }) => {
  const [datas, setDatas] = useState([]);
  const calendarRef = useRef(null);
  useEffect(() => {
    setDatas(data);
  }, []);
  const backgroundColorValidate = (data) => {
    return data == "Late" ? "#FFEB3B" : "#4CAF50";
  };
  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.removeAllEvents();
      datas.forEach((item) => {
        calendarApi.addEvent({
          start: item.created_at,
          display: "background",
          color: backgroundColorValidate(item.status),
          status: item.status,
        });
      });
    }
  }, [datas]);

  return (
    <div className="flex gap-10 justify-evenly items-center">
      <div className="w-[600px]">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev",
            center: "title",
            right: "next",
          }}
          height={600}
        />
      </div>
      <FormAttendenceComponent setDatas={setDatas} datas={datas} />
    </div>
  );
};

export default AttendenceComponent;
