"use client";
import FullCalendar from "@fullcalendar/react";
import React from "react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

const ScheduleComponent = ({ data }) => {
  console.log(data);
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        events={data?.map((item) => ({
          start: item.date,
          color: "#378006",
          title: item.title,
        }))}
      />
    </div>
  );
};

export default ScheduleComponent;
