"use client";
import MainLayout from "@/layouts/MainLayout";
import FullCalendar from "@fullcalendar/react";
import React from "react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFetch } from "@/hooks/useFetch";

const page = () => {
  const { data } = useFetch(`http://localhost:3000/api/attendence/1`);
  console.log(data);
  return (
    <MainLayout>
      <Button asChild>
        <Link href="/attendence/form">Attendence</Link>
      </Button>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          {
            start: "2025-06-01",
            display: "background",
            color: "#4CAF50", // Hijau (on-time)
            extendedProps: {
              status: "On Time", // Tambahkan data status
            },
          },
          {
            start: "2025-06-02",
            display: "background",
            color: "#FFEB3B", // Kuning (late)
            extendedProps: {
              status: "Late",
            },
          },
          {
            start: "2025-06-03",
            display: "background",
            color: "#F44336", // Merah (absent)
            extendedProps: {
              status: "Absent",
            },
          },
        ]}
        dayCellContent={(cellInfo) => {
          const dateStr = cellInfo.date.toISOString().split("T")[0];
          const event = cellInfo.view.calendar
            .getEvents()
            .find((e) => e.startStr === dateStr && e.display === "background");

          return (
            <div className="fc-daygrid-day-content">
              {/* Tanggal */}
              <div className="fc-daygrid-day-number">
                {cellInfo.dayNumberText}
              </div>

              {/* Status Text */}
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
    </MainLayout>
  );
};

export default page;
