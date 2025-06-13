"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import OvertimeAPI from "@/data/OvertimeAPI";
import { toast } from "sonner";
import Badge from "../Badge";

const FormDetailOvertime = ({ data, leaderId }) => {
  const [status, setStatus] = useState();

  useEffect(() => {
    setStatus({
      leader: data?.leader?.name,
      status: data?.approval_leader,
    });
  }, []);

  const approveHandle = async () => {
    const response = await OvertimeAPI.ApprovalOvertime({
      approval_leader: "Approved",
      leaderId: leaderId,
      id: data.id,
    });
    if (response?.status == 200) {
      toast("Successfuly", {
        title: response.message,
      });
      setStatus({
        leader: data?.leader.name,
        status: data?.approval_leader,
      });
    }
  };

  const rejectHandle = async () => {
    const response = await OvertimeAPI.ApprovalOvertime({
      approval_leader: "Rejected",
      leaderId: leaderId,
      id: data.id,
    });
    if (response?.status == 200) {
      toast("Successfuly", {
        title: response.message,
      });
      setStatus({
        leader: data?.leader.name,
        status: data?.approval_leader,
      });
    }
  };

  return (
    <table className=" border border-black w-full">
      <thead>
        <tr>
          <th colSpan="3" className="p-2 border border-black font-bold text-xl">
            FORM OVERTIME
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th className="bg-gray-200 p-2 border border-black " colSpan={3}>
            Employee{" "}
          </th>
        </tr>
        <tr className="border border-black">
          <td className="border border-black p-2">NPK : {data?.user?.npk}</td>
          <td className="border border-black p-2">Name : {data?.user?.name}</td>
          <td className="border border-black p-2">
            Date : {new Date(data?.date).toLocaleDateString()}
          </td>
        </tr>
        <tr className="border border-black">
          <td className="border border-black p-2">
            Section : {data?.user?.section?.section}
          </td>
          <td className="border border-black p-2">
            Position : {data?.user?.level?.level}
          </td>
          <td className="border border-black p-2">
            Shift : {data?.shift?.title} ({data?.shift?.work_time})
          </td>
        </tr>
        <tr>
          <th className="bg-gray-200 p-2 " colSpan={3}>
            Information{" "}
          </th>
        </tr>
        <tr>
          <td className="border border-black p-2" colSpan={2}>
            Work Note : {data?.work_note}
          </td>
          <td className="border border-black p-2">
            Lampiran :
            {data?.file == null ? (
              <Button size="sm" className="mx-2">
                Tidak ada
              </Button>
            ) : (
              <Button size="sm" className="mx-2">
                Open
              </Button>
            )}
          </td>
        </tr>
        <tr>
          <th className="bg-gray-200 p-2 border border-black">
            Overtime Duration
          </th>
          <th className="bg-gray-200 p-2 border border-black">
            Break Duration
          </th>
          <th className="bg-gray-200 p-2 border border-black">Compensation</th>
        </tr>
        <tr className="border border-black">
          <td className="border border-black p-2">
            {data?.overtime_duration} min
          </td>
          <td className="border border-black p-2">
            {data?.break_duration} min
          </td>
          <td className="border border-black p-2">{data?.compensation}</td>
        </tr>
        <tr className="border border-black">
          <td rowSpan={2} colSpan={2}></td>
          <th className="border border-black p-2 bg-gray-200">
            Approval Leader
          </th>
        </tr>
        <tr>
          <td className="border border-black p-2">
            {status?.leader != null ? (
              <div className="flex flex-col justify-center items-center gap-5">
                <h1 className="font-semibold">{status?.leader}</h1>
                <Badge status={status?.status} />
              </div>
            ) : (
              <div className="flex justify-center gap-2 items-center">
                <Button
                  size="sm"
                  variant=""
                  type="button"
                  onClick={() => approveHandle()}
                >
                  <FaCheck />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  type="button"
                  onClick={() => rejectHandle()}
                >
                  <IoMdClose />
                </Button>
              </div>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default FormDetailOvertime;
