"use client";
import React, { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Form } from "../ui/form";
import CustomSelect from "../CustomSelect";
import EmployeeAPI from "@/data/EmployeeAPI";
import CustomInput from "../CustomInput";
import { Button } from "../ui/button";
import PayRollAPI from "@/data/PayRollAPI";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const formSchema = z.object({
  employee: z.string().nonempty("employee cannot be empty"),
  date: z.string().nonempty("period cannot be empty"),
});
const FormPayrollComponent = ({ dataEmploye, dataPayroll, datas }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employee: datas?.id?.toString() || "",
      npk: datas?.npk || "",
      position: datas?.position || "",
      section: datas?.section || "",
      level: datas?.level || "",
      salary: Number(datas?.salary) || 0,
      leave_attendence: Number(datas?.count_leave) || 0,
      deduction_attendence: Number(dataPayroll?.deduction_attendence) || 0,
      overtime_duration: Number(datas?.count_overtime_duration) || 0,
      bonus_overtime: Number(dataPayroll?.bonus_overtime) || 0,
      bonus: Number(dataPayroll?.bonus) || 0,
      total_salary: Number(dataPayroll?.total_salary) || 0,
      deduction_bpjs: Number(dataPayroll?.deduction_bpjs) || 0,
      deduction_pph: Number(dataPayroll?.deduction_pph) || 0,
      date: dataPayroll
        ? `${dataPayroll.period_year}-${String(
            dataPayroll.period_month
          ).padStart(2, "0")}`
        : "",
    },
  });

  const dataEmployeMaster = useMemo(
    () =>
      dataEmploye.map((item) => ({
        id: item.id.toString(),
        value: item.name,
      })) || [],
    [dataEmploye]
  );

  const [
    leave_attendence,
    deduction_attendence,
    salary,
    overtime_duration,
    bonus_overtime,
    bonus,
  ] = useWatch({
    control: form.control,
    name: [
      "leave_attendence",
      "deduction_attendence",
      "salary",
      "overtime_duration",
      "bonus_overtime",
      "bonus",
    ],
  });

  useEffect(() => {
    if (dataPayroll && datas) {
      form.reset({
        employee: datas.id?.toString() || "",
        npk: datas.npk || "",
        position: datas.position || "",
        section: datas.section || "",
        level: datas.level || "",
        salary: Number(datas.salary) || 0,
        leave_attendence: Number(datas.count_leave) || 0,
        deduction_attendence: Number(dataPayroll.deduction_attendence) || 0,
        overtime_duration: Number(datas.count_overtime_duration) || 0,
        bonus_overtime: Number(dataPayroll.bonus_overtime) || 0,
        bonus: Number(dataPayroll.bonus) || 0,
        total_salary: Number(dataPayroll.total_salary) || 0,
        deduction_bpjs: Number(dataPayroll.deduction_bpjs) || 0,
        deduction_pph: Number(dataPayroll.deduction_pph) || 0,
        date: `${dataPayroll.period_year}-${String(
          dataPayroll.period_month
        ).padStart(2, "0")}`,
      });
    }
  }, [dataPayroll, datas, form]);

  useEffect(() => {
    const totalSalaryDay = Math.round(Number(salary) / 26);
    const totalSalaryHour = Math.round(Number(totalSalaryDay) / 24);

    //Calculate TAX BPJS
    const totalTaxBPJS = Math.round(Number(salary) * 0.03);
    form.setValue("deduction_bpjs", totalTaxBPJS);

    //Calculate TAX PPH
    const totalTaxPPH = Math.round(Number(salary) * 0.05);
    form.setValue("deduction_pph", totalTaxPPH);

    //Calculate PINALTY LEAVE
    const totalDeductionAttendence = Number(leave_attendence) * totalSalaryDay;
    form.setValue("deduction_attendence", totalDeductionAttendence);

    //Calculate Overtime Pay
    const overtimeHours = Number(overtime_duration) / 60;
    const totalOvertimePay = Math.round(overtimeHours * totalSalaryHour);
    form.setValue("bonus_overtime", totalOvertimePay);

    const totalSalary =
      salary +
      totalOvertimePay +
      Number(bonus) -
      (totalDeductionAttendence + totalTaxBPJS + totalTaxPPH);
    form.setValue("total_salary", totalSalary);
  }, [
    leave_attendence,
    deduction_attendence,
    salary,
    overtime_duration,
    bonus_overtime,
    bonus,
  ]);

  const onChange = async (value) => {
    const response = await EmployeeAPI.GetDetailMasterEmployee({ id: value });
    if (response) {
      form.setValue("npk", response.npk);
      form.setValue("level", response.level);
      form.setValue("position", response.position);
      form.setValue("section", response.section);
      form.setValue("overtime_duration", response.count_overtime_duration);
      form.setValue("leave_attendence", response.count_leave);
      form.setValue("salary", response.salary);
    }
  };

  const Submit = async (data) => {
    const [year, month] = data.date.split("-");
    if (dataPayroll) {
      const response = await PayRollAPI.UpdatePayRoll({
        bonus: Number(data.bonus),
        id: dataPayroll.id,
        total_salary: Number(data.total_salary),
      });
      if (response?.status == 200) {
        toast("Success", {
          title: response.message,
        });
      }
    } else {
      const response = await PayRollAPI.PostPayRoll({
        period_month: Number(month),
        period_year: Number(year),
        bonus: Number(data.bonus),
        bonus_overtime: Number(data.bonus_overtime),
        deduction_bpjs: Number(data.deduction_bpjs),
        deduction_pph: Number(data.deduction_pph),
        deduction_attendence: Number(data.deduction_attendence),
        total_salary: Number(data.total_salary),
        employeeId: Number(data.employee),
      });
      if (response.status == 201) {
        toast("Success", {
          title: response.message,
        });
      }
    }
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(Submit)}
      >
        <h1 className="font-bold">Information</h1>
        <div className="grid grid-cols-8">
          <CustomInput
            control={form.control}
            name="date"
            label="Periode Date"
            className="border-black"
            type="month"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {!dataPayroll ? (
            <CustomSelect
              control={form.control}
              name="employee"
              label="Employee"
              placeholder="Select employee"
              data={dataEmployeMaster}
              onChange={onChange}
            />
          ) : (
            <CustomSelect
              control={form.control}
              name="employee"
              label="Employee"
              placeholder="Select employee"
              data={dataEmployeMaster}
              disabled
            />
          )}
          <CustomInput
            control={form.control}
            name="npk"
            label="NPK"
            className="border-black"
            disabled
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <CustomInput
            control={form.control}
            name="level"
            label="Level"
            className="border-black"
            disabled
          />
          <CustomInput
            control={form.control}
            name="position"
            label="Position"
            disabled
            className="border-black"
          />
          <CustomInput
            control={form.control}
            name="section"
            label="Section"
            disabled
            className="border-black"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <CustomInput
            control={form.control}
            name="salary"
            label="Salary"
            disabled
            className="border-black"
          />
          <CustomInput
            control={form.control}
            name="overtime_duration"
            label="Overtime Duration"
            disabled
            className="border-black"
          />
          <CustomInput
            control={form.control}
            name="leave_attendence"
            label="Leave Attendence"
            disabled
            className="border-black"
          />
        </div>
        <h1 className="font-bold">Deduction</h1>
        <div className="grid grid-cols-3 gap-4">
          <CustomInput
            control={form.control}
            name="deduction_bpjs"
            label="Tax BPJS"
            className="border-red-600 text-red-600"
            description="Tax 3%"
            disabled
          />
          <CustomInput
            control={form.control}
            name="deduction_pph"
            label="Tax PPH"
            className="border-red-600 text-red-600"
            description="Tax 5%"
            disabled
          />
          <CustomInput
            control={form.control}
            name="deduction_attendence"
            label="Deduction Attendence"
            className="border-red-600 text-red-600"
            description="Pinalty leave"
            disabled
          />
        </div>
        <h1 className="font-bold">Bonus & Total</h1>
        <div className="grid grid-cols-3 gap-4">
          <CustomInput
            control={form.control}
            name="bonus"
            label="Bonus"
            className="border-green-600 text-green-600"
          />
          <CustomInput
            control={form.control}
            name="bonus_overtime"
            label="Bonus Overtime"
            className="border-green-600 text-green-600"
            disabled
          />
          <CustomInput
            control={form.control}
            name="total_salary"
            label="Total Salary"
            className="border-blue-600 text-blue-600 font-semibold"
            disabled
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit">SUBMIT</Button>
        </div>
      </form>
    </Form>
  );
};

export default FormPayrollComponent;
