"use client";
import FullCalendar from "@fullcalendar/react";
import React from "react";
import dayGridPlugin from "@fullcalendar/daygrid";

const ScheduleComponent = ({ data }) => {
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth",
        }}
        events={data?.map((item) => ({
          start: item.date,
          color: "#378006",
          title: item.title,
        }))}
        eventContent={(arg) => <b className="p-2">{arg.event.title}</b>}
      />
    </div>
  );
};

export default ScheduleComponent;
