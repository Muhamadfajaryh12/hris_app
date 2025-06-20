"use client";
import FullCalendar from "@fullcalendar/react";
import React, { useEffect, useRef, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import FormScheduleComponent from "./FormScheduleComponent";
import interactionPlugin from "@fullcalendar/interaction";
import CustomTableDialog from "../CustomTableDialog";
import ScheduleEventAPI from "@/data/ScheduleEventAPI";
const ScheduleComponent = ({ dataSchedule, dataSection, dataLevel }) => {
  const [dataSchedules, setDataSchedules] = useState([]);
  const calendarRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [listSchedules, setListSchedules] = useState([]);
  const [detailSchedule, setDetailSchedule] = useState();

  useEffect(() => {
    setDataSchedules(dataSchedule);
  }, []);

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.removeAllEvents();
      dataSchedules.forEach((item) => {
        calendarApi.addEvent({
          start: item.date_start,
          end: item?.date_end,
          title: item?.title,
          color: ColorValidate(item.category),
        });
      });
    }
  }, [dataSchedules]);

  const onClick = async (arg) => {
    const response = await ScheduleEventAPI.GetScheduleByDate({
      date: arg.dateStr,
    });
    setListSchedules(response);
    setIsOpen(true);
  };

  const handleClickDetail = async (id) => {
    const response = await ScheduleEventAPI.GetScheduleDetail({ id: id });
    setDetailSchedule(response);
    setIsOpen(false);
  };

  const ColorValidate = (category) => {
    switch (category) {
      case "Meeting":
        return "#0674ea";
      case "Training":
        return "#fdff04";
      case "Company Event":
        return "#04ff2f";
    }
  };

  return (
    <div className="flex justify-evenly mt-10 items-center flex-wrap gap-4">
      <div className="w-[600px]">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          ref={calendarRef}
          headerToolbar={{
            left: "prev",
            center: "title",
            right: "next",
          }}
          dateClick={onClick}
          height={600}
          eventContent={(arg) => <b className="p-2">{arg.event.title}</b>}
        />
      </div>
      <FormScheduleComponent
        dataLevel={dataLevel}
        dataSection={dataSection}
        setDataSchedules={setDataSchedules}
        detailSchedule={detailSchedule}
        setDetailSchedule={setDetailSchedule}
        dataSchedules={dataSchedules}
      />
      <CustomTableDialog
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        listSchedules={listSchedules}
        handleClickDetail={handleClickDetail}
      />
    </div>
  );
};

export default ScheduleComponent;
