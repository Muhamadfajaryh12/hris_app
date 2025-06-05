import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { FaClock } from "react-icons/fa6";

const page = () => {
  return (
    <MainLayout>
      <div className="border rounded-sm p-2 w-full h-full flex justify-center items-center">
        <div>
          <h1>{new Date().toDateString()}</h1>
          <Button variant="secondary">
            <FaClock /> Clock in
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default page;
