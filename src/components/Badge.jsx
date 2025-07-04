import React from "react";

const Badge = ({ status }) => {
  switch (status) {
    case "Waiting":
      return (
        <div className="p-2 bg-blue-100 rounded-sm text-blue-800 font-semibold text-sm w-24 text-center border-blue-300">
          <span>{status}</span>
        </div>
      );
    case "Rejected":
      return (
        <div className="p-2 bg-red-100 rounded-sm text-red-800 font-semibold text-sm w-24 text-center border-red-300">
          <span>{status}</span>
        </div>
      );
    case "Approved":
      return (
        <div className="p-2  bg-green-100 rounded-sm text-green-800 font-semibold text-sm w-24 text-center border-green-300">
          <span>{status}</span>
        </div>
      );
    case "Paid":
      return (
        <div className="p-2  bg-green-100 rounded-sm text-green-800 font-semibold text-sm w-24 text-center border-green-300">
          <span>{status}</span>
        </div>
      );
  }
};

export default Badge;
