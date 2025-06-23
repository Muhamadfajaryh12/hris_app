"use client";
import React, { useEffect, useState } from "react";
import Badge from "../Badge";
import { Button } from "../ui/button";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import AnnualLeaveAPI from "@/data/AnnualLeaveAPI";
import { toast } from "sonner";

const DetailRequestLeaveComponent = ({ data, userId }) => {
  const [statusLeader, setStatusLeader] = useState();
  const [statusHRD, setStatusHRD] = useState();

  useEffect(() => {
    setStatusLeader({
      leader: data?.leader?.name,
      status: data?.approval_leader,
    });
    setStatusHRD({
      hrd: data?.hrd?.name,
      status: data?.approval_hrd,
    });
  }, []);

  const handleLeader = async ({ approval }) => {
    const response = await AnnualLeaveAPI.UpdateAnnualLeave({
      approval_leader: approval,
      id: data?.id,
      leaderId: userId,
    });
    if (response?.status == 200) {
      toast("Success", {
        title: response?.message,
      });
      setStatusLeader({
        leader: response?.data?.leader?.name,
        status: response?.data?.approval_leader,
      });
    }
  };

  const handleHRD = async ({ approval }) => {
    const response = await AnnualLeaveAPI.UpdateAnnualLeave({
      approval_hrd: approval,
      id: data?.id,
      status: approval,
      hrdId: userId,
    });
    if (response?.status == 200) {
      toast("Success", {
        title: response?.message,
      });
      setStatusHRD({
        hrd: response?.data?.hrd?.name,
        status: response?.data?.approval_hrd,
      });
    }
  };

  return (
    <div>
      <table className="w-full border border-black">
        <thead>
          <tr>
            <th colSpan="3" className="p-2 bg-gray-200 border border-black ">
              FORM REQUEST LEAVE
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th colSpan={3} className="p-2 bg-gray-200 border border-black ">
              Employee
            </th>
          </tr>
          <tr>
            <td className="border border-black p-2">
              Name : {data?.user.name}
            </td>
            <td className="border border-black p-2">NPK : {data?.user.npk}</td>
            <td className="border border-black p-2">
              Position : {data?.user?.position?.position}
            </td>
          </tr>
          <tr>
            <th colSpan={3} className="p-2 bg-gray-200 border border-black ">
              Information
            </th>
          </tr>
          <tr>
            <td className="border border-black p-2">
              Leave Request: {data.type}
            </td>
            <td className="border border-black p-2" colSpan={2}>
              Reason : {data.reason}
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2">
              Date start : {new Date(data.date_start).toLocaleDateString()}
            </td>
            <td className="border border-black p-2">
              Date end : {new Date(data.date_end).toLocaleDateString()}
            </td>
            <td className="border border-black p-2">
              Total Work Days Off : {data.data_count} day
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2" rowSpan={2}></td>
            <td className="border border-black p-2 bg-gray-200 text-center">
              Approval Leader
            </td>
            <td className="border border-black p-2 bg-gray-200 text-center">
              Approval HRD
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2">
              {statusLeader?.leader != null ? (
                <div className="flex flex-col justify-center items-center gap-5">
                  <h1>{statusLeader?.leader}</h1>
                  <Badge status={statusLeader?.status} />
                </div>
              ) : (
                <div className="flex justify-center gap-2">
                  <Button
                    size="sm"
                    variant=""
                    type="button"
                    onClick={() => handleLeader({ approval: "Approved" })}
                  >
                    <FaCheck />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    type="button"
                    onClick={() => handleLeader({ approval: "Rejected" })}
                  >
                    <IoMdClose />
                  </Button>
                </div>
              )}
            </td>
            <td className="border border-black p-2">
              {statusHRD?.hrd != null ? (
                <div className="flex flex-col justify-center items-center gap-5">
                  <h1>{statusHRD?.hrd}</h1>
                  <Badge status={statusHRD?.status} />
                </div>
              ) : (
                <div className="flex justify-center gap-2">
                  <Button
                    size="sm"
                    variant=""
                    type="button"
                    onClick={() => handleHRD({ approval: "Approved" })}
                  >
                    <FaCheck />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    type="button"
                    onClick={() => handleHRD({ approval: "Rejected" })}
                  >
                    <IoMdClose />
                  </Button>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DetailRequestLeaveComponent;
