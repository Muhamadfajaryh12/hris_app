"use client";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import ShiftAPI from "@/data/ShiftAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const page = () => {
  const form = useForm({
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
    <MainLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(Submit)}>
          <div className="flex flex-col gap-4">
            <CustomInput
              control={form.control}
              field={form.field}
              name="title"
              label="Title"
              type="text"
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
    </MainLayout>
  );
};

export default page;
