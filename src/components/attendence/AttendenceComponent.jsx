"use client";
import FullCalendar from "@fullcalendar/react";
import React from "react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AttendenceComponent = ({ data }) => {
  const backgroundColorValidate = (data) => {
    return data == "Late" ? "#FFEB3B" : "#4CAF50";
  };
  return (
    <div>
      <div className="flex gap-2">
        <Button asChild>
          <Link href="/attendence/form">Attendence</Link>
        </Button>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={data?.map((item) => ({
          start: item.created_at,
          display: "background",
          color: backgroundColorValidate(item.status),
        }))}
        dayCellContent={(cellInfo) => {
          const dateStr = cellInfo.date.toISOString().split("T")[0];
          const event = cellInfo.view.calendar
            .getEvents()
            .find((e) => e.startStr === dateStr && e.display === "background");

          return (
            <div className="fc-daygrid-day-content">
              <div className="fc-daygrid-day-number">
                {cellInfo.dayNumberText}
              </div>

              {event && (
                <div
                  className="fc-daygrid-status"
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginTop: "2px",
                    color: event.color === "#FFEB3B" ? "#000" : "#fff", // Kuning pakai text hitam
                    backgroundColor: event.color + "CC", // Tambah opacity
                    borderRadius: "4px",
                    padding: "1px 3px",
                  }}
                >
                  {event.extendedProps.status}
                </div>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default AttendenceComponent;
