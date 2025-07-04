"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import CustomSelect from "../CustomSelect";
import CustomInput from "../CustomInput";
import { Button } from "../ui/button";
import { toast } from "sonner";
import ContractAPI from "@/data/ContractAPI";
import CardFile from "../ui/CardFile";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

const formSchema = z.object({
  status: z.string().nonempty("status cannot be empty"),
  contract: z.string().nonempty("contract cannot be empty"),
  start_date: z.string().nonempty("start date cannot be empty"),
  end_date: z.string().nonempty("end date cannot be empty"),
  employee: z.string().nonempty("employee cannot be empty"),
  file_contract: z.any(),
});

const FormContract = ({ dataEmployee, dataContract }) => {
  const {
    id,
    start_date,
    end_date,
    contract_type,
    status,
    employeeId,
    file_contract,
  } = dataContract || {};

  const [editMode, setEditMode] = useState(false);

  const dataEmployeeMaster = useMemo(
    () =>
      dataEmployee?.map((item) => ({
        id: item.id.toString(),
        value: item.name,
      })) || [],
    [dataEmployee]
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employee: employeeId?.toString() || "",
      status: status || "",
      contract: contract_type || "",
      start_date: start_date || "",
      end_date: end_date || "",
      file_contract: "",
    },
  });

  useEffect(() => {
    if (dataContract) {
      form.reset({
        status: status,
        contract: contract_type,
        employee: employeeId.toString(),
        start_date: new Date(start_date).toISOString().split("T")[0] || "",
        end_date: new Date(end_date).toISOString().split("T")[0] || "",
      });
    }
  }, [dataContract]);

  const Submit = useCallback(async (value) => {
    const formData = new FormData();
    formData.append("start_date", value.start_date);
    formData.append("end_date", value.end_date);
    formData.append("status", value.status);
    formData.append("contract_type", value.contract);
    formData.append("employeeId", value.employee);
    formData.append("file_contract", value.file_contract);

    let response;
    response = dataContract
      ? await ContractAPI.UpdateContract({ id: id, formData: formData })
      : await ContractAPI.PostContract({ formData: formData });

    if ([200, 201].includes(response?.status)) {
      toast(response.message);
      if (!dataContract) form.reset();
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
        {file_contract && !editMode ? (
          <React.Fragment>
            <label className="font-semibold">File Contract</label>
            <div className="flex gap-4 items-center">
              <CardFile title={file_contract} />
              <Button type="button" onClick={() => setEditMode(true)}>
                Edit
              </Button>
            </div>
          </React.Fragment>
        ) : (
          <CustomInput
            control={form.control}
            name="file_contract"
            label="Upload"
            type="file"
          />
        )}
        <div className="flex justify-end">
          <Button type="submit">SUBMIT</Button>
        </div>
      </form>
    </Form>
  );
};

export default FormContract;
