"use client";
import { useFetch } from "@/hooks/useFetch";
import { Form } from "../ui/form";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { FaClock } from "react-icons/fa6";
import AttendenceAPI from "@/data/AttendenceAPI";
import CustomSelect from "../CustomSelect";
import { toast } from "sonner";

const dataEmotion = [
  {
    id: "Very Good",
    value: "Very Good",
  },
  {
    id: " Good",
    value: " Good",
  },
  {
    id: "Not Good",
    value: "Not Good",
  },
];

const FormAttendenceComponent = ({ setDatas, datas }) => {
  const [time, setTime] = useState(new Date());
  const dates = new Date("2025-06-09T07:00:00").toISOString().split("T")[0];
  const { data, setData } = useFetch(
    `http://localhost:3000/api/attendence?id=1&date=${dates}`
  );

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  const form = useForm({
    defaultValues: {
      emotion: "",
    },
  });

  const Submit = async (datas) => {
    if (data?.length > 0) {
      const response = await AttendenceAPI.UpdateAttendence({
        id: data[0]?.id,
        time_out: new Date(),
        emotion: datas.emotion,
      });
      if (response?.status == 200) {
        toast("Success Clock out", {
          description: response?.message,
        });
        setData([response.data]);
      }
    } else {
      const response = await AttendenceAPI.InsertAttendence({
        userId: 1,
        time_in: new Date("2025-06-09T07:00:00"),
      });
      if (response?.status == 201) {
        toast("Success Clock in", {
          description: response?.message,
        });
        setData([response.data]);
        setDatas((prev) => [...prev, response.data]);
      }
    }
  };
  return (
    <div className="">
      <h1 className="font-bold text-6xl">ATTENDENCE</h1>
      <p className="font-semibold my-5 text-xl">
        {time.toLocaleString("en-US")}
      </p>
      {data[0]?.time_out ? (
        <h2 className="p-2 bg-green-200  text-green-800">
          Thank you for today
        </h2>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(Submit)} className="w-full">
            {data.length > 0 ? (
              <>
                <CustomSelect
                  data={dataEmotion}
                  form={form.control}
                  name="emotion"
                  label="How are u today"
                  placeholder="Select your emotion"
                />
                <Button type="submit" className="w-full my-5">
                  <FaClock /> Clock Out
                </Button>
              </>
            ) : (
              <Button type="submit" className="w-full">
                <FaClock /> Clock In
              </Button>
            )}
          </form>
        </Form>
      )}
    </div>
  );
};

export default FormAttendenceComponent;
