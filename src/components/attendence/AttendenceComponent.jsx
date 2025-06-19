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

          // dayCellContent={(cellInfo) => {
          //   const dateStr = cellInfo.date.toISOString().split("T")[0];
          //   const event = cellInfo.view.calendar
          //     .getEvents()
          //     .find(
          //       (e) => e.startStr === dateStr && e.display === "background"
          //     );

          //   return (
          //     <div className="fc-daygrid-day-content">
          //       <div className="fc-daygrid-day-number">
          //         {cellInfo.dayNumberText}
          //       </div>

          //       {event && (
          //         <div
          //           className="fc-daygrid-status"
          //           style={{
          //             fontSize: "0.7rem",
          //             fontWeight: "bold",
          //             textAlign: "center",
          //             marginTop: "2px",
          //             color: event.color === "#FFEB3B" ? "#000" : "#fff", // Kuning pakai text hitam
          //             backgroundColor: event.color + "CC", // Tambah opacity
          //             borderRadius: "4px",
          //             padding: "1px 3px",
          //           }}
          //         >
          //           {event.extendedProps.status}
          //         </div>
          //       )}
          //     </div>
          //   );
          // }}
        />
      </div>
      <FormAttendenceComponent setDatas={setDatas} datas={datas} />
    </div>
  );
};

export default AttendenceComponent;
