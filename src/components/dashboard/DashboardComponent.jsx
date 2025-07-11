"use client";
import React, { useMemo } from "react";
import { FaUser, FaUserGroup } from "react-icons/fa6";
import CardDashboard from "../CardDashboard";
import { Calendar } from "@/components/ui/calendar";
import CustomPieChart from "../CustomPieChart";
import { useCurrency } from "@/hooks/useCurrency";
import { LuCalendar } from "react-icons/lu";
import { useFormattedDate } from "@/hooks/useFormattedDate";
import { CustomLineChart } from "../CustomLineChart";
import { format } from "date-fns";

const DashboardComponent = ({ data }) => {
  const listScheduleCategory = (value) => {
    switch (value) {
      case "Meeting":
        return (
          <div className="rounded-md p-2 w-12 flex justify-center items-center bg-violet-300">
            <FaUser size={20} className="text-violet-800" />
          </div>
        );
      case "Company Event":
        return (
          <div className="rounded-md p-2 w-12 flex justify-center items-center bg-pink-300">
            <FaUser size={20} className="text-pink-800" />
          </div>
        );
    }
  };
  const CHART_CONFIG = {
    count_emotion: {
      label: "Employee Count",
    },
    Good: {
      label: "Good",
      color: "#69dc61",
    },
    "Very Good": {
      label: "Very Good",
      color: "#009540",
    },
    "Not Good": {
      label: "Not Good",
      color: "#d6184f",
    },
  };

  const CHART_LINEAR_CONFIG = {
    total_cost: {
      label: "Total Cost",
      color: "#ff0000",
    },
  };
  const processReflectionData = useMemo(() => {
    if (!data?.get_reflection) return [];

    return data.get_reflection.map((item) => ({
      emotion: item.emotion,
      count_emotion: parseInt(item.count_emotion) || 0,
      fill: CHART_CONFIG[item.emotion]?.color ?? "#ccc",
    }));
  }, [data?.get_reflection]);
  return (
    <div className="">
      <div className="grid grid-cols-4 gap-4">
        <CardDashboard
          data={data?.total_employee}
          icon={<FaUserGroup className="text-blue-800 " size={30} />}
          style={"bg-blue-200"}
          title={"Total Employee"}
        />
        <CardDashboard
          data={data?.on_time}
          icon={<FaUserGroup className="text-green-800 " size={30} />}
          style={"bg-green-200"}
          title={"Present"}
        />
        <CardDashboard
          data={data?.late}
          icon={<FaUserGroup className="text-orange-800 " size={30} />}
          style={"bg-orange-200"}
          title={"Late"}
        />
        <CardDashboard
          data={data?.leave}
          icon={<FaUserGroup className="text-violet-800 " size={30} />}
          style={"bg-violet-200"}
          title={"Annual Leave"}
        />
        <div className="flex flex-col gap-4">
          <div className=" border rounded-sm">
            <Calendar
              mode="single"
              className="mx-auto"
              formatters={{
                formatDay: (date) => format(date, "d"),
                formatCaption: (date) => format(date, "MMMM yyyy"),
              }}
            />
          </div>
          <div className="border rounded-sm p-2">
            <label htmlFor="" className="text-gray-400 text-sm">
              Schedules
            </label>
            {data?.schedule.length > 0 ? (
              data?.schedule?.map((item) => (
                <div className="flex gap-2 my-3 " key={item.id}>
                  {listScheduleCategory(item.category)}
                  <div className="w-full">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-200  border-blue-800 text-blue-800 rounded-sm">
                        <LuCalendar />
                      </div>
                      <div className="flex justify-between w-full">
                        <div className="">
                          <h1 className="font-bold">{item.title}</h1>{" "}
                          <label htmlFor="" className="text-xs ">
                            {item.category} ({item.hours_start} -{" "}
                            {item.hours_end})
                          </label>
                        </div>
                        <h1 className="text-sm text-gray-400">
                          {useFormattedDate(item.date)}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-center my-4 font-extralight">
                No Results
              </p>
            )}
          </div>
        </div>

        <div className="">
          <CustomPieChart
            chartData={processReflectionData}
            title="Reflection Employee"
            periode="Month year"
            dataKey="count_emotion"
            nameKey="emotion"
            chartConfig={CHART_CONFIG}
          />
        </div>
        <div className=" col-span-2">
          <div className="border rounded-md p-4 h-48">
            <label htmlFor="" className="text-gray-400 text-sm">
              Cost Value Estimate
            </label>
            <h2 className="font-bold  text-2xl">
              {useCurrency(data?.get_cost)}
            </h2>
            <CustomLineChart
              dataKey="total_cost"
              dataKeyX="period_month"
              data={data?.get_cost_month}
              chartConfig={CHART_LINEAR_CONFIG}
            />
          </div>
          <div className="border rounded-md p-4 my-4">
            <label htmlFor="" className="text-gray-400 text-sm">
              Request Leave
            </label>
            {data?.get_request_leave?.length > 0 ? (
              data?.get_request_leave?.map((item, index) => (
                <div
                  className="flex gap-4 items-center my-2 justify-between"
                  key={index}
                >
                  <div className="flex gap-4 items-center">
                    <div className="p-2 bg-violet-200 border border-violet-800 text-violet-800 rounded-sm">
                      <FaUser />
                    </div>
                    <div className="">
                      <h6 className="text-sm font-semibold">
                        {item?.user?.name}
                      </h6>
                      <p className="text-sm">{item?.type}</p>
                    </div>
                  </div>
                  <div className="bg-blue-200 text-blue-800 border border-blue-800 p-1 rounded-sm  ">
                    <p className="text-xs">Need Confirmation</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-center my-4 font-extralight">
                No Results
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
