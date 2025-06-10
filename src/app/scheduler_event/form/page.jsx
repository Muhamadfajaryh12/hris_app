"use client";
import CustomInput from "@/components/CustomInput";
import CustomSelect from "@/components/CustomSelect";
import { Form } from "@/components/ui/form";
import { useFetch } from "@/hooks/useFetch";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { useForm } from "react-hook-form";

const dataType = [
  {
    id: "Meeting",
    value: "Meeting",
  },
  {
    id: "Company_Event",
    value: "Company Event",
  },
  {
    id: "Training",
    value: "Training",
  },
];
const page = () => {
  const { data: dataSection } = useFetch(`http://localhost:3000/api/section`);
  const { data: dataLevel } = useFetch(`http://localhost:3000/api/level`);
  const form = useForm();
  const dataSectionMaster = dataSection?.map((item) => ({
    id: item.id.toString(),
    value: item.section,
  }));

  const dataLevelMaster = dataLevel?.map((item) => ({
    id: item.id.toString(),
    value: item.level,
  }));
  return (
    <MainLayout>
      <Form {...form}>
        <form>
          <div className="flex flex-col gap-4">
            <CustomInput
              control={form.control}
              field={form.field}
              name="title"
              placeholder="title"
              type="text"
              label="Title"
            />
            <CustomInput
              control={form.control}
              field={form.field}
              name="description"
              placeholder="description"
              type="text"
              label="Description"
            />
            <div className="grid grid-cols-3 gap-4">
              <CustomInput
                control={form.control}
                field={form.field}
                name="date"
                placeholder="date"
                type="date"
                label="Date"
              />
              <CustomInput
                control={form.control}
                field={form.field}
                name="time_start"
                placeholder="time"
                type="time"
                label="Time start"
              />
              <CustomInput
                control={form.control}
                field={form.field}
                name="time_end"
                placeholder="time"
                type="time"
                label="Time end"
              />
            </div>
            <div className="grid grid-col-3 gap-4">
              <CustomSelect
                control={form.control}
                name="section"
                label="Section"
                placeholder="Section"
                data={dataSectionMaster}
              />
              <CustomSelect
                control={form.control}
                name="level"
                label="level"
                placeholder="level"
                data={dataLevelMaster}
              />
              <CustomSelect
                control={form.control}
                name="type"
                label="Type"
                placeholder="type"
                data={dataType}
              />
            </div>
          </div>
        </form>
      </Form>
    </MainLayout>
  );
};

export default page;
