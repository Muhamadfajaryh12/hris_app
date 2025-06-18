import { useCurrency } from "@/hooks/useCurrency";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const PayrollDetailComponent = ({ data }) => {
  console.log(data);
  return (
    <div className="">
      <table className="border w-full">
        <thead>
          <tr>
            <th className="p-2 border border-black bg-gray-100" colSpan={4}>
              SLIP SALARY
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              className="p-2 border border-black bg-gray-100 font-bold"
              colSpan={2}
            >
              Periode
            </td>
            <td className="p-2 border border-black">{data.period_month}</td>
            <td className="p-2 border border-black">{data.period_year}</td>
            <td></td>
          </tr>
          <tr>
            <td className="p-2 border border-black">
              Name : {data.employee.name}{" "}
            </td>
            <td className="p-2 border border-black">
              NPK : {data.employee?.npk}
            </td>
            <td className="p-2 border border-black" colSpan={2}>
              Position : {data.employee.position.position}{" "}
            </td>
            <td> </td>
          </tr>
          <tr>
            <td
              className="p-2 border border-black bg-gray-100 font-bold"
              colSpan={2}
            >
              Earnings
            </td>
            <td
              className="p-2 border border-black bg-gray-100 font-bold"
              colSpan={2}
            >
              Deductions
            </td>
          </tr>
          <tr>
            <td className="p-2 border border-black">Basic Salary</td>
            <td className="p-2 border border-black">
              {useCurrency(data?.employee.salary[0].total_salary)}
            </td>
            <td className="p-2 border border-black">Deduction Attendence</td>
            <td className="p-2 border border-black">
              {useCurrency(data.deduction_attendence)}
            </td>
          </tr>
          <tr>
            <td className="p-2 border border-black">Bonus</td>
            <td className="p-2 border border-black">
              {useCurrency(data?.bonus)}
            </td>
            <td className="p-2 border border-black">Deduction BPJS</td>
            <td className="p-2 border border-black">
              {useCurrency(data.deduction_bpjs)}
            </td>
          </tr>
          <tr>
            <td className="p-2 border border-black">Bonus Overtime</td>
            <td className="p-2 border border-black">
              {useCurrency(data?.bonus_overtime)}
            </td>
            <td className="p-2 border border-black">Deduction PPH</td>
            <td className="p-2 border border-black">
              {useCurrency(data.deduction_pph)}
            </td>
          </tr>
          <tr>
            <td
              className="p-2 border border-black bg-gray-100 font-bold"
              colSpan={3}
            >
              NET Salary
            </td>
            <td className="p-2 border border-black font-bold">
              {useCurrency(data.total_salary)}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-center gap-2 mt-5">
        <Button variant="destructive">PRINT</Button>
        <Button asChild>
          <Link href="/payroll">BACK</Link>
        </Button>
      </div>
    </div>
  );
};

export default PayrollDetailComponent;
