"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import AttendenceAPI from "@/data/AttendenceAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { useForm } from "react-hook-form";
import { FaClock } from "react-icons/fa6";

const page = () => {
  const form = useForm();
  const Submit = async (data) => {
    const response = await AttendenceAPI.InsertAttendence({
      userId: 1,
      time_in: new Date(),
    });
    console.log(response);
  };
  return (
    <MainLayout>
      <div className="border rounded-sm p-2 w-full h-full flex justify-center items-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(Submit)}>
            <Button variant="secondary" type="submit">
              <FaClock /> Clock in
            </Button>
          </form>
        </Form>
      </div>
    </MainLayout>
  );
};

export default page;
