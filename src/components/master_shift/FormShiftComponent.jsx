"use client";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import ShiftAPI from "@/data/ShiftAPI";
import { zodResolver } from "@hookform/resolvers/zod";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().nonempty("shift cannot be empty"),
  work_start: z.string().nonempty("work start cannot be empty"),
  work_end: z.string().nonempty("work end cannot be empty"),
});

const FormShiftComponent = ({ dataShift }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: dataShift?.title || "",
      work_start: dataShift?.work_start || "",
      work_end: dataShift?.work_end || "",
    },
  });

  if (dataShift) {
    useEffect(() => {
      const work_time = dataShift.work_time.split("-");

      form.reset({
        title: dataShift.title,
        work_start: work_time[0],
        work_end: work_time[1],
      });
    }, [dataShift]);
  }
  const Submit = async (data) => {
    const payload = {
      title: data.title,
      work_time: `${data.work_start} - ${data.work_end}`,
      ...(dataShift && { id: dataShift.id }),
    };

    if (dataShift) {
      const response = await ShiftAPI.UpdateShift(payload);
      if (response?.status == 200) {
        toast("Successfuly", {
          title: response.message,
        });
        form.reset();
      }
    } else {
      const response = await ShiftAPI.PostShift(payload);
      if (response?.status == 201) {
        toast("Successfuly", {
          title: response.message,
        });
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
            name="title"
            label="Title"
            type="text"
            placeholder="name shift"
          />
          <div className="grid grid-cols-2 gap-4">
            <CustomInput
              control={form.control}
              field={form.field}
              name="work_start"
              label="Work start"
              type="time"
            />
            <CustomInput
              control={form.control}
              field={form.field}
              name="work_end"
              label="Work end"
              type="time"
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

export default FormShiftComponent;
