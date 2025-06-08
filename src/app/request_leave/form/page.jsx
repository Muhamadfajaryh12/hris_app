"use client";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { useForm } from "react-hook-form";

const page = () => {
  const form = useForm();
  return (
    <MainLayout>
      <Form {...form}>
        <form className="flex flex-col gap-4">
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
