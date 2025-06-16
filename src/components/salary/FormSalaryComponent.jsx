"use client";
import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Form } from "../ui/form";
import CustomSelect from "../CustomSelect";
import CustomInput from "../CustomInput";
import { Button } from "../ui/button";
import SalaryAPI from "@/data/SalaryAPI";
import { toast } from "sonner";

const FormSalaryComponent = ({ dataEmployee }) => {
  const form = useForm({
    defaultValues: {
      employeeId: "",
      base_salary: "",
      increase_salary: "",
      start_date: "",
      end_date: "",
    },
  });

  const [base_salary, increase_salary] = useWatch({
    control: form.control,
    name: ["base_salary", "increase_salary"],
  });

  useEffect(() => {
    if (base_salary && increase_salary) {
      const total = Number(base_salary) + Number(increase_salary);
      form.setValue("total_salary", total);
    } else if (base_salary) {
      form.setValue("total_salary", base_salary);
    } else {
      form.setValue("total_salary", "");
    }
  }, [base_salary, increase_salary, form]);

  const dataEmployeeMaster = dataEmployee.map((item) => ({
    id: item.id.toString(),
    value: item.name,
  }));

  const onChange = (value) => {
    const selectedEmployee = dataEmployee.find((item) => item.id == value);
    if (selectedEmployee) {
      form.setValue("base_salary", selectedEmployee.position.base_salary);
      form.setValue("increase_salary", "");
    }
  };

  const Submit = async (data) => {
    const response = await SalaryAPI.PostSalary({
      basic_salary: data.base_salary,
      increase_salary: data.increase_salary,
      total_salary: data.total_salary,
      employeeId: data.employeeId,
      start_date: new Date(data.start_date),
      end_date: new Date(data.end_date),
    });

    if (response.status == 201) {
      toast("Successfuly", {
        title: response.message,
      });
      form.reset();
    }
  };

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
