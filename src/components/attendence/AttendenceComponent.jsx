"use client";
import FullCalendar from "@fullcalendar/react";
import React, { useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { Button } from "@/components/ui/button";
import { FaClock } from "react-icons/fa6";
import { useFetch } from "@/hooks/useFetch";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import AttendenceAPI from "@/data/AttendenceAPI";

const AttendenceComponent = ({ data }) => {
  const [time, setTime] = useState(new Date());

  const dates = new Date().toISOString().split("T")[0];
  const { data: datas } = useFetch(
    `http://localhost:3000/api/attendence?id=1&date=${dates}`
  );

  const backgroundColorValidate = (data) => {
    return data == "Late" ? "#FFEB3B" : "#4CAF50";
  };

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  const form = useForm();
  const Submit = async (datas) => {
    if (datas?.length > 0) {
      const response = await AttendenceAPI.UpdateAttendence({
        id: datas[0]?.id,
        time_out: new Date(),
      });
      if (response?.status == 200) {
        toast("Success Clock out", {
          description: response?.message,
        });
      }
    } else {
      const response = await AttendenceAPI.InsertAttendence({
        userId: 1,
        time_in: new Date(),
      });
      if (response?.status == 201) {
        toast("Success Clock in", {
          description: response?.message,
        });
      }
    }
  };

  return (
    <div className="flex gap-10 justify-evenly items-center">
      <div className="w-[600px]">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev",
            center: "title",
            right: "next",
          }}
          height={600}
          events={data?.map((item) => ({
            start: item.created_at,
            display: "background",
            color: backgroundColorValidate(item.status),
          }))}
          dayCellContent={(cellInfo) => {
            const dateStr = cellInfo.date.toISOString().split("T")[0];
            const event = cellInfo.view.calendar
              .getEvents()
              .find(
                (e) => e.startStr === dateStr && e.display === "background"
              );

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
      <div className="">
        <h1 className="font-bold text-6xl">ATTENDENCE</h1>
        <p className="font-semibold my-5 text-xl">
          {time.toLocaleString("en-US")}
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(Submit)} className="w-full">
            <Button type="submit" className="w-full">
              <FaClock /> {datas?.length > 0 ? "Clock Out" : "Clock In"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AttendenceComponent;
