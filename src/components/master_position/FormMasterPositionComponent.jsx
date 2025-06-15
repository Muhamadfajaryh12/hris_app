"use client";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import PositionAPI from "@/data/PositionAPI";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const FormMasterPositionComponent = ({ dataPosition }) => {
  const form = useForm({
    defaultValues: {
      position: "",
      base_salary: "",
    },
  });

  if (dataPosition) {
    useEffect(() => {
      form.reset({
        position: dataPosition.position,
        base_salary: dataPosition.base_salary,
      });
    }, []);
  }
  const Submit = async (data) => {
    if (dataPosition) {
      const response = await PositionAPI.UpdatePosition({
        position: data.position,
        base_salary: data.base_salary,
        id: dataPosition.id,
      });
      if (response?.status == 200) {
        toast("Successfuly", { title: response.message });
        form.reset();
      }
    } else {
      const response = await PositionAPI.PostPosition({
        position: data.position,
        base_salary: data.base_salary,
      });
      if (response?.status == 201) {
        toast("Successfuly", { title: response.message });
        form.reset();
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(Submit)}
        className="flex flex-col gap-4"
      >
        <CustomInput
          control={form.control}
          name="position"
          label="Position"
          placeholder="position"
          type="text"
        />
        <CustomInput
          control={form.control}
          name="base_salary"
          label="Base Salary"
          placeholder="Rp.000.000"
          type="number"
        />
        <div className="flex justify-end">
          <Button type="submit" size="sm">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormMasterPositionComponent;
