"use client";
import CustomInput from "@/components/CustomInput";
import CustomSelect from "@/components/CustomSelect";
import { Form } from "@/components/ui/form";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import dataCompensation from "@/utils/data/dataCompensation";
import OvertimeAPI from "@/data/OvertimeAPI";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MntToTime } from "@/lib/TimeToMnt";
import CardFile from "../ui/CardFile";

const formSchema = z.object({
  date: z.string().nonempty("date cannot be empty"),
  shift: z.string().nonempty("shift cannot be empty"),
  work_note: z.string().nonempty("work note cannot be empty"),
  upload: z.any(),
  shiftId: z.string().nonempty("shift cannot be empty"),
  overtime_duration: z.string().nonempty("overtime duration cannot be empty"),
  compensation: z.string().nonempty("compensation cannot be empty"),
});

const FormOvertime = ({ dataShift, dataOvertime }) => {
  console.log(dataOvertime);
  const [uploadMode, setUploadMode] = useState(false);
  const form = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      date: dataOvertime?.date || "",
      shiftId: dataOvertime?.shiftId?.toString() || "",
      work_note: dataOvertime?.work_note || "",
      upload: "",
      overtime_duration: MntToTime(dataOvertime?.overtime_duration) || "",
      break_duration: MntToTime(dataOvertime?.break_duration) || "",
      compensation: dataOvertime?.compensation || "",
    },
  });

  const MasterDataShift = useMemo(
    () =>
      dataShift?.map((item) => ({
        id: item.id.toString(),
        value: `${item.title} - ${item.work_time}`,
      })) || [],
    [dataShift]
  );

  if (dataOvertime) {
    useEffect(() => {
      form.reset({
        date: new Date(dataOvertime.date).toISOString().split("T")[0],
        work_note: dataOvertime.work_note,
        shiftId: dataOvertime.shiftId.toString(),
        compensation: dataOvertime.compensation,
        overtime_duration: MntToTime(dataOvertime.overtime_duration),
        break_duration: MntToTime(dataOvertime.break_duration),
      });
    }, [dataOvertime]);
  }

  const Submit = async (data) => {
    console.log("test");
    const formData = new FormData();
    formData.append("date", data.date);
    formData.append("shiftId", data.shiftId);
    formData.append("work_note", data.work_note);
    formData.append("overtime_duration", data.overtime_duration);
    formData.append("break_duration", data.break_duration);
    formData.append("compensation", data.compensation);
    formData.append("file", data.upload);
    let response;
    if (dataOvertime) {
      response = await OvertimeAPI.UpdateOvertime({
        formData: formData,
        id: dataOvertime.id,
      });
    } else {
      response = await OvertimeAPI.PostOvertime({ formData: formData });
    }

    if (response?.status == 201 || 200) {
      toast("Successfuly", {
        title: response.message,
      });
      if (response?.status === 201) {
        form.reset();
      }
    }
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
            name="shiftId"
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
          {dataOvertime?.file && !uploadMode ? (
            <div>
              <label htmlFor="" className="font-semibold">
                File
              </label>
              <div className="flex items-center gap-4">
                <CardFile title={dataOvertime?.file} />
                <Button type="button" onClick={() => setUploadMode(true)}>
                  Edit
                </Button>
              </div>
            </div>
          ) : (
            <CustomInput
              control={form.control}
              field={form.field}
              name="upload"
              label="Upload file"
              type="file"
            />
          )}
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
