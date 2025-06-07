"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import AttendenceAPI from "@/data/AttendenceAPI";
import { useFetch } from "@/hooks/useFetch";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { useForm } from "react-hook-form";
import { FaClock } from "react-icons/fa6";
import { toast } from "sonner";

const page = () => {
  const dates = new Date().toISOString().split("T")[0];
  const { data } = useFetch(
    `http://localhost:3000/api/attendence?id=1&date=${dates}`
  );
  console.log(data[0]?.id);
  const form = useForm();
  const Submit = async (datas) => {
    if (data) {
      const response = await AttendenceAPI.UpdateAttendence({
        id: data[0]?.id,
        time_out: new Date(),
      });
      if (response?.status == 200) {
        toast("Success Clock out", {
          description: response?.message,
        });
      }
    } else {
      const response = await AttendenceAPI.InsertAttendence({
        userId: 1,
        time_in: new Date(),
      });
      if (response?.status == 201) {
        toast("Success Clock in", {
          description: response?.message,
        });
      }
    }
  };
  return (
    <MainLayout>
      <div className="border rounded-sm p-2 w-full h-full flex justify-center items-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(Submit)}>
            <Button variant="secondary" type="submit">
              <FaClock /> {data ? "Clock Out" : "Clock In"}
            </Button>
          </form>
        </Form>
      </div>
    </MainLayout>
  );
};

export default page;
