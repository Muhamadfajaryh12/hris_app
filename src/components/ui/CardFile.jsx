import Link from "next/link";
import React from "react";

const CardFile = ({ title }) => {
  return (
    <div className="p-2 rounded-md bg-gray-200 my-2">
      <Link href={title}>{title}</Link>
    </div>
  );
};

export default CardFile;
