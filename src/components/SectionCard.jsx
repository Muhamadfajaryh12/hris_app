import React from "react";

const SectionCard = ({ title, count, styleCard }) => {
  return (
    <div className={`p-4 border rounded-sm w-full ${styleCard}`}>
      <h6 className="font-semibold">{title}</h6>
      <h1 className="text-3xl font-bold">{count}</h1>
    </div>
  );
};

export default SectionCard;
