"use client";
import React, { useCallback, useMemo } from "react";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import CustomSelect from "../CustomSelect";
import CustomInput from "../CustomInput";
import { Button } from "../ui/button";
import ContractAPI from "@/data/ContractAPI";
import { toast } from "sonner";

const statusType = [
  {
    id: "Active",
    value: "Active",
  },
  {
    id: "Expired",
    value: "Expired",
  },
];

const contractType = [
  {
    id: "Internship",
    value: "Internship",
  },
  {
    id: "Contract",
    value: "Contract",
  },
  {
    id: "Permanent",
    value: "Permanent",
  },
];

const FormContract = ({ dataEmployee }) => {
  const dataEmployeeMaster = useMemo(
    () =>
      dataEmployee.map((item) => ({
        id: item.id.toString(),
        value: item.name,
      })) || [],
    [dataEmployee]
  );

  const form = useForm({
    defaultValues: {
      employee: "",
      status: "",
      contract: "",
      start_date: "",
      end_date: "",
      file_contract: "",
    },
  });

  const Submit = useCallback(async (value) => {
    const formData = new FormData();
    formData.append("start_date", value.start_date);
    formData.append("end_date", value.end_date);
    formData.append("status", value.status);
    formData.append("contract_type", value.contract);
    formData.append("employeeId", value.employee);
    formData.append("file_contract", value.file_contract);

    const response = await ContractAPI.PostContract({ formData: formData });
    if (response?.status == 201) {
      toast("Success", {
        title: response.message,
      });
      form.reset();
    }
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(Submit)}
      >
        <CustomSelect
          control={form.control}
          name="employee"
          label="Employee"
          placeholder="Select employee"
          data={dataEmployeeMaster}
        />
        <div className="grid grid-cols-2 gap-4">
          <CustomSelect
            control={form.control}
            name="status"
            label="Status"
            placeholder="Select status"
            data={statusType}
          />
          <CustomSelect
            control={form.control}
            name="contract"
            label="Type"
            placeholder="Select contract"
            data={contractType}
          />
          <CustomInput
            control={form.control}
            name="start_date"
            label="Start Date"
            type="date"
          />
          <CustomInput
            control={form.control}
            name="end_date"
            label="End Date"
            type="date"
          />
        </div>
        <CustomInput
          control={form.control}
          name="file_contract"
          label="Upload"
          type="file"
        />
        <div className="flex justify-end">
          <Button type="submit">SUBMIT</Button>
        </div>
      </form>
    </Form>
  );
};

export default FormContract;
