"use client";
import CustomInput from "@/components/CustomInput";
import CustomSelect from "@/components/CustomSelect";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import EmployeeAPI from "@/data/EmployeeAPI";
import { useFetch } from "@/hooks/useFetch";
import MainLayout from "@/layouts/MainLayout";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import dataGender from "@/utils/data/dataGender";
import { useParams } from "next/navigation";
const page = () => {
  const params = useParams();
  const { data: dataSection } = useFetch(`http://localhost:3000/api/section`);
  const { data: dataLevel } = useFetch(`http://localhost:3000/api/level`);
  const { data: dataEmployee } = useFetch(
    `http://localhost:3000/api/employee/${params.id}`
  );

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      no_telp: "",
      npk: "",
      gender: "",
    },
  });

  useEffect(() => {
    if (dataEmployee && dataLevel && dataSection) {
      form.reset({
        name: dataEmployee.name,
        email: dataEmployee.email,
        no_telp: dataEmployee.no_telp,
        npk: dataEmployee.npk,
        gender: dataEmployee.gender,
        level: String(dataEmployee?.levelId),
        section: String(dataEmployee?.sectionId),
      });
    }
  }, [dataEmployee, dataLevel, dataSection]);

  const dataSectionMaster = dataSection?.map((item) => ({
    id: item.id.toString(),
    value: item.section,
  }));

  const dataLevelMaster = dataLevel?.map((item) => ({
    id: item.id.toString(),
    value: item.level,
  }));

  const Submit = async (data) => {
    const response = await EmployeeAPI.PutEmployee({
      name: data.name,
      email: data.email,
      no_telp: data.no_telp,
      npk: data.npk,
      gender: data.gender,
      levelId: data.level,
      sectionId: data.section,
      id: params.id,
    });

    if (response?.status == 200) {
      toast("Successfully", {
        description: response.message,
      });
    }
  };

  return (
    <MainLayout title="Form Master Employee">
      <Form {...form}>
        <form
          className="w-full flex flex-col gap-4 "
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
