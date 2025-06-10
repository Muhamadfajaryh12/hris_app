"use client";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import AnnualLeaveAPI from "@/data/AnnualLeaveAPI";
import { toast } from "sonner";

const page = () => {
  const form = useForm({
    defaultValues: {
      date: "",
      reason: "",
    },
  });

  const Submit = async (data) => {
    const response = await AnnualLeaveAPI.PostAnnualLeave({
      reason: data.reason,
      date_leave: new Date(data.date),
    });
    if (response?.status == 201) {
      toast("Successfully", {
        description: response.message,
      });
    }
  };

  return (
    <MainLayout>
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(Submit)}
        >
          <CustomInput
            control={form.control}
            name="date"
            label="Date"
            type="date"
          />
          <CustomInput
            control={form.control}
            name={"reason"}
            label="Reason"
            placeholder="reason"
            type="text"
          />
          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </MainLayout>
  );
};

export default page;
