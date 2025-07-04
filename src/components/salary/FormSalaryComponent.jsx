"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Form } from "../ui/form";
import CustomSelect from "../CustomSelect";
import CustomInput from "../CustomInput";
import { Button } from "../ui/button";
import SalaryAPI from "@/data/SalaryAPI";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const formSchema = z.object({
  employeeId: z.string().nonempty("employee cannot be empty"),
  start_date: z.string().nonempty("start date cannot be empty"),
  end_date: z.string().nonempty("end date cannot be empty"),
  increase_salary: z.any(),
  total_salary: z.any(),
  base_salary: z.any(),
});

const FormSalaryComponent = ({ dataEmployee, dataSalary }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeId: dataSalary?.employeeId.toString() || "",
      base_salary: dataSalary?.basic_salary || 0,
      increase_salary: dataSalary?.increase_salary || 0,
      total_salary: dataSalary?.total_salary || 0,
      start_date: dataSalary?.start_date || "",
      end_date: dataSalary?.end_date || "",
    },
  });

  const [base_salary, increase_salary] = useWatch({
    control: form.control,
    name: ["base_salary", "increase_salary"],
  });

  const dataEmployeeMaster = useMemo(
    () =>
      dataEmployee.map((item) => ({
        id: item.id.toString(),
        value: item.name,
      })) || [],
    [dataEmployee]
  );

  useEffect(() => {
    const total = Number(base_salary || 0) + Number(increase_salary || 0);
    form.setValue("total_salary", total, { shouldValidate: true });
  }, [base_salary, increase_salary, form]);

  useEffect(() => {
    if (dataSalary) {
      form.reset({
        employeeId: dataSalary.employeeId.toString(),
        base_salary: dataSalary.basic_salary,
        increase_salary: dataSalary.increase_salary,
        total_salary: dataSalary.total_salary,
        start_date: new Date(dataSalary.start_date).toISOString().split("T")[0],
        end_date: new Date(dataSalary.end_date).toISOString().split("T")[0],
      });
    }
  }, [dataSalary, form]);

  const onChange = useCallback((value) => {
    const selectedEmployee = dataEmployee.find((item) => item.id == value);
    if (selectedEmployee) {
      form.setValue("base_salary", selectedEmployee.position.base_salary);
      form.setValue("increase_salary", "");
    }
  });

  const Submit = useCallback(async (data) => {
    const payload = {
      basic_salary: data.base_salary,
      increase_salary: data.increase_salary,
      total_salary: data.total_salary,
      employeeId: data.employeeId,
      start_date: new Date(data.start_date),
      end_date: new Date(data.end_date),
      ...(dataSalary && { id: dataSalary.id }),
    };

    const response = dataSalary
      ? await SalaryAPI.UpdateSalary(payload)
      : await SalaryAPI.PostSalary(payload);

    if ([200, 201].includes(response.status)) {
      toast({
        title: "Successfully",
        description: response.message,
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
          name="employeeId"
          label="Employe Name"
          placeholder="Select employe"
          data={dataEmployeeMaster}
          onChange={onChange}
        />
        <div className="grid grid-cols-3 gap-4">
          <CustomInput
            control={form.control}
            name="base_salary"
            label="Base Salary"
            placeholder="0000"
            type="number"
            disabled
          />
          <CustomInput
            control={form.control}
            name="increase_salary"
            label="Increase Salary"
            placeholder="0000"
            type="number"
          />
          <CustomInput
            control={form.control}
            name="total_salary"
            label="Total Salary"
            placeholder="0000"
            type="number"
            disabled
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
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
        <div className="flex justify-end">
          <Button type="submit">SUBMIT</Button>
        </div>
      </form>
    </Form>
  );
};

export default FormSalaryComponent;
