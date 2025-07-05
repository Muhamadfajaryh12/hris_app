import MasterShiftComponent from "@/components/master_shift/MasterShiftComponent";
import ShiftAPI from "@/data/ShiftAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async () => {
  const data = await ShiftAPI.GetShift();
  return (
    <MainLayout title={["Master Shift"]}>
      <MasterShiftComponent dataShift={data} />
    </MainLayout>
  );
};

export default page;
