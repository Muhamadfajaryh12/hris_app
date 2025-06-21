import React from "react";
import { FaUser, FaUserGroup } from "react-icons/fa6";
import CardDashboard from "../CardDashboard";
import { Calendar } from "@/components/ui/calendar";
import CustomPieChart from "../CustomPieChart";

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

  const processReflectionData = () => {
    return data?.get_reflection?.map(
      (item) =>
        ({
          emotion: item.emotion,
          count_emotion: parseInt(item.count_emotion) || 0,
          fill: CHART_CONFIG[item.emotion]?.color,
        } || [])
    );
  };

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
        <div className=" border rounded-sm">
          <Calendar mode="single" className="mx-auto" />
          <div className=" p-2">
            <h1 className="font-bold mb-2">Schedules</h1>
            {data?.schedule?.map((item) => (
              <div className="flex gap-2 my-3 " key={item.id}>
                {listScheduleCategory(item.category)}
                <div className="w-full">
                  <div className="flex  justify-between">
                    <h1 className="font-bold">{item.title}</h1>
                    <h1 className="text-sm text-gray-400">
                      {new Date(item.date).toLocaleDateString()}
                    </h1>
                  </div>
                  <label htmlFor="" className="text-sm ">
                    {item.category} ({item.hours_start} - {item.hours_end})
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <CustomPieChart
            chartData={processReflectionData()}
            title="Reflection Employee"
            periode="Month year"
            dataKey="count_emotion"
            nameKey="emotion"
            chartConfig={CHART_CONFIG}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
