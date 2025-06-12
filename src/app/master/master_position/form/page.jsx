"use client";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import PositionAPI from "@/data/PositionAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const page = () => {
  const form = useForm({
    defaultValues: {
      position: "",
    },
  });

  const Submit = async (data) => {
    const response = await PositionAPI.PostPosition({
      position: data.position,
    });
    if (response?.status == 201) {
      toast("Successfuly", { title: response.message });
      form.reset();
    }
  };

  return (
    <MainLayout>
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
          <div className="flex justify-end">
            <Button type="submit" size="sm">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </MainLayout>
  );
};

export default page;
