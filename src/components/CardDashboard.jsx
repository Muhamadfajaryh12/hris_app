import React from "react";

const CardDashboard = ({ data, style, icon, title }) => {
  return (
    <div className="border rounded-md p-4">
      <div className="flex justify-between">
        <div className="">
          <label htmlFor="" className="text-gray-400 text-sm">
            {title}
          </label>
          <h1 className="font-bold text-2xl">{data}</h1>
        </div>
        <div
          className={`${style} p-2 rounded-md w-16  flex justify-center items-center `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default CardDashboard;
