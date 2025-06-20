import React from "react";
import CustomChartBar from "../CustomChartBar";

const EmployeeAnalyticComponent = ({ data }) => {
  const CHART_CONFIG_EMPLOYEE_BY_SECTION = {
    count_employee: {
      label: "Total",
      color: "#0087ff",
    },
  };

  const CHART_CONFIG_COST_BY_SECTION = {
    cost_section: {
      label: "Total Cost",
      color: "#0087ff",
    },
  };

  const CHART_CONFIG_TIME_WORK_OVERTIME_BY_SECTION = {
    total_time_working: {
      label: "Total Time Working",
      color: "#0087ff",
    },
    total_overtime: {
      label: "Total Overtime",
      color: "#65b3f8",
    },
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <CustomChartBar
        chartConfig={CHART_CONFIG_EMPLOYEE_BY_SECTION}
        chartData={data?.countEmployeeBySection}
        title="Total Employee by Section"
        dataKeyX={"section_name"}
        dataKeyBar={"count_employee"}
        bars={[{ dataKey: "count_employee", fill: "#0087ff" }]}
      />
      <CustomChartBar
        chartConfig={CHART_CONFIG_COST_BY_SECTION}
        chartData={data?.countCostBySection}
        title="Total Cost by Section"
        dataKeyX={"section_name"}
        bars={[{ dataKey: "cost_section", fill: "#0087ff" }]}
      />
      <CustomChartBar
        chartConfig={CHART_CONFIG_TIME_WORK_OVERTIME_BY_SECTION}
        chartData={data?.countWorkTimeAndOvertimeBySection}
        title="Total Time Working and Overtime by Section"
        dataKeyX={"section_name"}
        bars={[
          { dataKey: "total_time_working", fill: "#0087ff" },
          { dataKey: "total_overtime", fill: "#65b3f8" },
        ]}
      />
    </div>
  );
};

export default EmployeeAnalyticComponent;
