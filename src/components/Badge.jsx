import React from "react";

const Badge = ({ status }) => {
  console.log(status);
  switch (status) {
    case "Waiting":
      return (
        <div className="p-2 bg-blue-500 rounded-sm text-white font-semibold text-sm w-24 text-center">
          <span>{status}</span>
        </div>
      );
    case "Rejected":
      return (
        <div className="p-2 bg-red-500 rounded-sm text-white font-semibold text-sm w-24 text-center">
          <span>{status}</span>
        </div>
      );
    case "Approved":
      return (
        <div className="p-2  bg-green-500 rounded-sm text-white font-semibold text-sm w-24 text-center">
          <span>{status}</span>
        </div>
      );
  }
};

export default Badge;
