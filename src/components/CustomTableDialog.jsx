import React from "react";

import { Button } from "./ui/button";
import { FaPencil, FaTrash } from "react-icons/fa6";

const CustomTableDialog = ({
  isOpen,
  setIsOpen,
  listSchedules,
  handleClickDetail,
  handleClickDelete,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  p-4">
      <div
        className="absolute inset-0 bg-black opacity-40"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative  p-4 bg-white rounded-md opacity-100 max-w-6xl w-full">
        <h1 className="font-bold text-xl">Detail Event</h1>
        <table className="w-full border border-black my-4">
          <thead>
            <tr>
              <th className="border border-black p-2 text-sm">No</th>
              <th className="border border-black p-2 text-sm">Title</th>
              <th className="border border-black p-2 text-sm">Category</th>
              <th className="border border-black p-2 text-sm">Hours</th>
              <th className="border border-black p-2 text-sm">Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listSchedules?.map((item, index) => (
              <tr key={item.id}>
                <td className="border border-black p-2 text-sm text-center">
                  {++index}
                </td>
                <td className="border border-black p-2 text-sm">
                  {item.title}
                </td>
                <td className="border border-black p-2 text-sm">
                  {item.category}
                </td>
                <td className="border border-black p-2 text-sm">
                  {item.hours_start} - {item.hours_end}
                </td>
                <td className="border border-black p-2 text-sm">
                  {item.description}
                </td>
                <td className="border border-black p-2 text-sm">
                  <div className="flex justify-center gap-2">
                    <Button onClick={() => handleClickDetail(item.id)}>
                      <FaPencil />
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleClickDelete(item.id)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center">
          <Button onClick={() => setIsOpen(false)} className="mt-2">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomTableDialog;
