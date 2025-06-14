"use client";
import React from "react";
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

const FormScheduleComponent = ({ dataSection, dataLevel }) => {
  const form = useForm({
    defaultValues: {
      title: "",
      date: "",
      hours_start: "",
      hours_end: "",
      section: "",
      level: "",
      description: "",
      category: "",
    },
  });

  const dataSectionMaster = dataSection.map((item) => ({
    id: item.id.toString(),
    value: item.section,
  }));

  const dataLevelMaster = dataLevel.map((item) => ({
    id: item.id.toString(),
    value: item.level,
  }));

  const Submit = async (data) => {
    const response = await ScheduleEventAPI.PostSchedule({
      title: data.title,
      date: new Date(data.date),
      hours_start: data.hours_start,
      hours_end: data.hours_end,
      sectionId: data.section,
      category: data.category,
      levelId: data.level,
      description: data.description,
    });

    if (response?.status == 201) {
      toast("Successfuly", {
        title: response.message,
      });
      form.reset();
    }
  };
  return (
    <div>
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
          />
          <div className="grid grid-cols-3 gap-4">
            <CustomInput
              control={form.control}
              field={form.field}
              name="date"
              label="Date"
              placeholder="date"
              type="date"
            />
            <CustomInput
              control={form.control}
              field={form.field}
              name="hours_start"
              label="Hour Start"
              type="time"
            />
            <CustomInput
              control={form.control}
              field={form.field}
              name="hours_end"
              label="Hour End"
              type="time"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
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
          />
          <div className="flex justify-end">
            <Button type="submit">SUBMIT</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormScheduleComponent;
