"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import CustomInput from "../CustomInput";
import CustomTextArea from "../CustomTextArea";
import CustomSelect from "../CustomSelect";
import { Button } from "../ui/button";
import ScheduleEventAPI from "@/data/ScheduleEventAPI";
import { toast } from "sonner";
const dataCategory = [
  {
    id: "Meeting",
    value: "Meeting",
  },
  {
    id: "Company Event",
    value: "Company Event",
  },
  {
    id: "Training",
    value: "Training",
  },
];

const FormScheduleComponent = ({
  dataSection,
  dataLevel,
  setDataSchedules,
  detailSchedule,
  dataSchedules,
  setDetailSchedule,
}) => {
  const form = useForm({
    defaultValues: {
      title: detailSchedule?.title || "",
      date_start: detailSchedule?.date_start || "",
      date_end: detailSchedule?.date_end || "",
      hours_start: detailSchedule?.hours_start || "",
      hours_end: detailSchedule?.hours_end || "",
      section: detailSchedule?.sectionId || "",
      level: detailSchedule?.levelId || "",
      description: detailSchedule?.description || "",
      category: detailSchedule?.category || "",
    },
  });

  const dataSectionMaster = useMemo(
    () =>
      dataSection.map((item) => ({
        id: item.id.toString(),
        value: item.section,
      })) || []
  );

  const dataLevelMaster = useMemo(
    () =>
      dataLevel.map((item) => ({
        id: item.id.toString(),
        value: item.level,
      })) || []
  );

  useEffect(() => {
    form.reset({
      title: detailSchedule?.title || "",
      date_start: detailSchedule?.date_start || "",
      date_end: detailSchedule?.date_end || "",
      hours_start: detailSchedule?.hours_start || "",
      hours_end: detailSchedule?.hours_end || "",
      section: detailSchedule?.sectionId || "",
      level: detailSchedule?.levelId || "",
      description: detailSchedule?.description || "",
      category: detailSchedule?.category || "",
    });
  }, [detailSchedule]);

  const Submit = async (data) => {
    const payload = {
      title: data.title,
      date: new Date(data.date_start),
      date_end: new Date(data?.date_end) || null,
      hours_start: data.hours_start,
      hours_end: data.hours_end,
      sectionId: data.section,
      category: data.category,
      levelId: data.level,
      description: data.description,
      ...(detailSchedule && { id: detailSchedule.id }),
    };
    if (detailSchedule) {
      const response = await ScheduleEventAPI.UpdateSchedule(payload);

      if (response?.status == 200) {
        toast("Successfuly", {
          title: response.message,
        });
        form.reset();
        let findIndex = dataSchedules.findIndex(
          (item) => item.id == detailSchedule.id
        );

        setDataSchedules((prev) => {
          const newSchedules = [...prev];
          if (findIndex !== -1) {
            newSchedules[findIndex] = response?.data;
          }
          return newSchedules;
        });
        setDetailSchedule(null);
      }
    } else {
      const response = await ScheduleEventAPI.PostSchedule(payload);

      if (response?.status == 201) {
        toast("Successfuly", {
          title: response.message,
        });
        form.reset();
        setDataSchedules((prev) => [...prev, response?.data]);
      }
    }
  };

  return (
    <div className="border rounded-sm p-4 shadow-lg w-[600px]">
      <div className="p-2  font-bold text-center my-2">
        <h1 className="text-2xl">SCHEDULE AND EVENT FORM</h1>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(Submit)}
        >
          <CustomInput
            control={form.control}
            field={form.field}
            name="title"
            label="Title"
            placeholder="title"
            type="text"
            className="border border-black"
          />
          <div className="grid grid-cols-2 gap-4">
            <CustomInput
              control={form.control}
              field={form.field}
              name="date_start"
              label="Date Start"
              placeholder="date"
              type="date"
              className="border border-black"
            />

            <CustomInput
              control={form.control}
              field={form.field}
              name="date_end"
              label="Date End"
              placeholder="date"
              type="date"
              className="border border-black"
            />

            <CustomInput
              control={form.control}
              field={form.field}
              name="hours_start"
              label="Hour Start"
              type="time"
              className="border border-black"
            />

            <CustomInput
              control={form.control}
              field={form.field}
              name="hours_end"
              label="Hour End"
              type="time"
              className="border border-black"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <CustomSelect
              control={form.control}
              name="category"
              label="Category"
              placeholder="Select category"
              data={dataCategory}
            />
            <CustomSelect
              control={form.control}
              name="section"
              label="Section"
              placeholder="Select section"
              data={dataSectionMaster}
            />
            <CustomSelect
              control={form.control}
              name="level"
              label="Level"
              placeholder="Select level"
              data={dataLevelMaster}
            />
          </div>
          <CustomTextArea
            control={form.control}
            name="description"
            label="Description"
            placeholder="description"
            className="border border-black"
          />
          <Button type="submit">SAVE EVENT</Button>
        </form>
      </Form>
    </div>
  );
};

export default FormScheduleComponent;
