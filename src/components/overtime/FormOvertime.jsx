"use client";
import CustomInput from "@/components/CustomInput";
import CustomSelect from "@/components/CustomSelect";
import { Form } from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import dataCompensation from "@/utils/data/dataCompensation";
import OvertimeAPI from "@/data/OvertimeAPI";
import { Button } from "../ui/button";

const FormOvertime = ({ dataShift }) => {
  const form = useForm({
    defaultValues: {
      date: "",
      shift: "",
      work_note: "",
      upload: "",
      overtime_duration: "",
      break_duration: "",
      compensation: "",
    },
  });

  const MasterDataShift = dataShift?.map((item) => ({
    id: item.id.toString(),
    value: `${item.title} - ${item.work_time}`,
  }));

  const Submit = async (data) => {
    const formData = new FormData();
    formData.append("date", data.date);
    formData.append("shift", data.shift);
    formData.append("work_note", data.work_note);
    formData.append("overtime_duration", data.overtime_duration);
    formData.append("break_duration", data.break_duration);
    formData.append("compensation", data.compensation);
    formData.append("upload", data.upload);
    const response = await OvertimeAPI.PostOvertime({ formData: formData });
    console.log(response);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(Submit)}>
        <div className="flex flex-col gap-4">
          <CustomInput
            control={form.control}
            field={form.field}
            name="date"
            label="Overtime Date"
            type="date"
          />
          <CustomSelect
            control={form.control}
            label="Shift"
            name="shift"
            placeholder="Select shift"
            data={MasterDataShift}
          />
          <CustomInput
            control={form.control}
            field={form.field}
            name="work_note"
            label="Work Note"
            type="text"
          />{" "}
          <CustomInput
            control={form.control}
            field={form.field}
            name="upload"
            label="Upload file"
            type="file"
          />
          <div className="grid grid-cols-3 gap-4">
            <CustomInput
              control={form.control}
              field={form.field}
              name="overtime_duration"
              label="Overtime Duration"
              type="time"
            />
            <CustomInput
              control={form.control}
              field={form.field}
              name="break_duration"
              label="Break Duration"
              type="time"
            />
            <CustomSelect
              control={form.control}
              label="Compensation"
              name="compensation"
              placeholder="Select compensation"
              data={dataCompensation}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default FormOvertime;
