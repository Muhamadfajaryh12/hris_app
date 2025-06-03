"use client";
import CustomInput from "@/components/CustomInput";
import CustomSelect from "@/components/CustomSelect";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import EmployeeAPI from "@/data/EmployeeAPI";
import { useFetch } from "@/hooks/useFetch";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const dataGender = [
  {
    id: "Laki-Laki",
    value: "Laki-Laki",
  },
  {
    id: "Perempuan",
    value: "Perempuan",
  },
];

const page = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      no_telp: "",
      npk: "",
      gender: "",
      level: "",
      section: "",
    },
  });

  const { data: dataSection } = useFetch(`http://localhost:3000/api/section`);
  const { data: dataLevel } = useFetch(`http://localhost:3000/api/level`);

  const dataSectionMaster = dataSection?.map((item) => ({
    id: item.id.toString(),
    value: item.section,
  }));

  const dataLevelMaster = dataLevel?.map((item) => ({
    id: item.id.toString(),
    value: item.level,
  }));

  const Submit = async (data) => {
    const response = await EmployeeAPI.PostEmployee({
      name: data.name,
      email: data.email,
      no_telp: data.no_telp,
      npk: data.npk,
      gender: data.gender,
      levelId: data.level,
      sectionId: data.section,
      password: data.npk,
    });

    if (response?.status == 201) {
      toast("Successfully", {
        description: response.message,
      });
    }
  };
  return (
    <MainLayout title="Form Master Employee">
      <Form {...form}>
        <form
          className="w-full flex flex-col gap-4"
          onSubmit={form.handleSubmit(Submit)}
        >
          <CustomInput
            control={form.control}
            name="name"
            label="Name"
            placeholder="name"
            type="text"
          />
          <CustomInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="email"
            type="email"
          />
          <div className="grid grid-cols-2 gap-4">
            <CustomInput
              control={form.control}
              name="npk"
              label="NPK"
              placeholder="0000"
              type="number"
            />
            <CustomInput
              control={form.control}
              name="no_telp"
              label="Telephone"
              placeholder="0896"
              type="number"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <CustomSelect
              control={form.control}
              name="gender"
              label="Gender"
              placeholder="Select gender"
              data={dataGender}
            />
            <CustomSelect
              control={form.control}
              name="level"
              label="Level"
              placeholder="Select level position"
              data={dataLevelMaster}
            />
            <CustomSelect
              control={form.control}
              name="section"
              label="Section"
              placeholder="Select section"
              data={dataSectionMaster}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </MainLayout>
  );
};

export default page;
