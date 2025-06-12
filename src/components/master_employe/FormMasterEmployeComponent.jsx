"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import CustomInput from "@/components/CustomInput";
import CustomSelect from "@/components/CustomSelect";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import EmployeeAPI from "@/data/EmployeeAPI";
import dataGender from "@/utils/data/dataGender";
const FormMasterEmployeComponent = ({
  dataSection,
  dataLevel,
  dataPosition,
  dataEmployee,
}) => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      no_telp: "",
      npk: "",
      gender: "",
      level: "",
      section: "",
      position: "",
    },
  });

  if (dataEmployee && dataGender && dataLevel && dataPosition) {
    useEffect(() => {
      form.reset({
        name: dataEmployee.name,
        email: dataEmployee.email,
        no_telp: dataEmployee.no_telp,
        npk: dataEmployee.npk,
        gender: dataEmployee.gender,
        level: dataEmployee.levelId,
        section: dataEmployee.sectionId,
        position: dataEmployee.positionId,
      });
    }, [dataEmployee, dataGender, dataLevel, dataPosition]);
  }

  const dataSectionMaster = dataSection?.map((item) => ({
    id: item.id.toString(),
    value: item.section,
  }));

  const dataPositionMaster = dataPosition?.map((item) => ({
    id: item.id.toString(),
    value: item.position,
  }));

  const dataLevelMaster = dataLevel?.map((item) => ({
    id: item.id.toString(),
    value: item.level,
  }));

  const Submit = async (data) => {
    if (dataEmployee) {
      const response = await EmployeeAPI.PutEmployee({
        name: data.name,
        email: data.email,
        no_telp: data.no_telp,
        npk: data.npk,
        gender: data.gender,
        levelId: data.level,
        positionId: data.position,
        sectionId: data.section,
        positionId: data.position,
        id: dataEmployee.id,
      });

      if (response?.status == 200) {
        toast("Successfully", {
          description: response.message,
        });
      }
    } else {
      const response = await EmployeeAPI.PostEmployee({
        name: data.name,
        email: data.email,
        no_telp: data.no_telp,
        npk: data.npk,
        gender: data.gender,
        levelId: data.level,
        positionId: data.position,
        sectionId: data.section,
        password: data.npk,
      });

      if (response?.status == 201) {
        toast("Successfully", {
          description: response.message,
        });
      }
    }
  };
  return (
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
        <div className="grid grid-cols-4 gap-4">
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
          <CustomSelect
            control={form.control}
            name="position"
            label="Position"
            placeholder="Select position"
            data={dataPositionMaster}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default FormMasterEmployeComponent;
