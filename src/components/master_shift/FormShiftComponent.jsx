"use client";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import ShiftAPI from "@/data/ShiftAPI";
import { zodResolver } from "@hookform/resolvers/zod";

import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().nonempty("shift cannot be empty"),
  work_start: z.string().nonempty("work start cannot be empty"),
  work_end: z.string().nonempty("work end cannot be empty"),
});

const FormShiftComponent = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      work_start: "",
      work_end: "",
    },
  });

  const Submit = async (data) => {
    const response = await ShiftAPI.PostShift({
      title: data.title,
      work_time: `${data.work_start} - ${data.work_end}`,
    });

    if (response?.status == 201) {
      toast("Successfuly", {
        title: response.message,
      });
      form.reset();
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
