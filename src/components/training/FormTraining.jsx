"use client";
import React, { useState } from "react";
import { z } from "zod";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import CustomInput from "../CustomInput";
import CustomSelect from "../CustomSelect";
import TrainingAPI from "@/data/TrainingAPI";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().nonempty("title cannot be empty"),
  training_type: z.string().nonempty("type cannot be empty"),
  training_category: z.string().nonempty("category cannot be empty"),
  cost: z.any(),
  training_date: z.string().nonempty("date cannot be empty"),
  file: z.any(),
});

const dataType = [
  {
    id: "Workshop",
    value: "Workshop",
  },
  {
    id: "On Site",
    value: "On Site",
  },
  {
    id: "Online",
    value: "Online",
  },
];

const dataCategory = [
  {
    id: "Internal",
    value: "Internal",
  },
  {
    id: "Eksternal",
    value: "Eksternal",
  },
];

const FormTraining = ({ trainingData, userId }) => {
  const [editMode, setEditMode] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: trainingData?.title || "",
      training_type: trainingData?.training_type || "",
      cost: trainingData?.cost || "",
      training_date:
        new Date(trainingData?.training_date).toISOString().split("T")[0] || "",
      training_category: trainingData?.training_category || "",
      file: "",
    },
  });

  const Submit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("training_type", data.training_type);
    formData.append("training_date", new Date(data.training_date));
    formData.append("training_category", data.training_category);
    formData.append("cost", data.cost);
    formData.append("file", data.file);
    formData.append("userId", userId);

    const response = trainingData
      ? await TrainingAPI.UpdateTraining({
          formData: formData,
          id: trainingData.id,
        })
      : await TrainingAPI.PostTraining({ formData: formData });
    if ([200, 201].includes(response.status)) {
      toast(response.message);
      if (!trainingData) {
        form.reset();
      }
    }
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(Submit)}
      >
        <div className="grid grid-cols-2 gap-4">
          <CustomInput
            name="title"
            label="Title"
            placeholder="training title"
            type="text"
            control={form.control}
          />
          <CustomInput
            name="training_date"
            label="Date"
            placeholder="training date"
            type="date"
            control={form.control}
          />
          <CustomInput
            name="cost"
            label="Cost"
            placeholder="0"
            type="number"
            control={form.control}
          />
          <CustomSelect
            name="training_type"
            label="Training Type"
            data={dataType}
            placeholder="Select type training"
            control={form.control}
          />
          <CustomSelect
            name="training_category"
            label="Training Category"
            data={dataCategory}
            placeholder="Select category training"
            control={form.control}
          />
          {trainingData.file && !editMode ? (
            <div className="">
              <label htmlFor="" className="font-semibold">
                File
              </label>
              <div className="flex gap-4 items-center">
                <div className="bg-gray-200 border p-1 rounded-md">
                  <span className="text-sm">{trainingData.file}</span>
                </div>
                <Button
                  type="button"
                  onClick={() => setEditMode(true)}
                  size="sm"
                >
                  Edit
                </Button>
              </div>
            </div>
          ) : (
            <CustomInput
              name="file"
              label="Upload"
              placeholder=""
              type="file"
              accept=".pdf"
              control={form.control}
            />
          )}
        </div>
        <div className="flex justify-end">
          <Button type="submit">SUBMIT</Button>
        </div>
      </form>
    </Form>
  );
};

export default FormTraining;
