"use client";
import MainLayout from "@/layouts/MainLayout";
import FullCalendar from "@fullcalendar/react";
import React from "react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <MainLayout>
      <Button asChild>
        <Link href="/attendence/form">Attendence</Link>
      </Button>
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
    </MainLayout>
  );
};

export default page;
