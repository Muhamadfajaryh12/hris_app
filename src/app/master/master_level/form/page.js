"use client";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import LevelAPI from "@/data/LevelAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const MasterLevelFormPage = () => {
  const form = useForm({
    defaultValues: {
      level: "",
    },
  });

  const Submit = async (data) => {
    const response = await LevelAPI.PostLevel({ level: data.level });
    if (response?.status == 201) {
      toast("Successfully", {
        description: response.message,
      });
    }
  };

  return (
    <MainLayout title={"Form Master Level"}>
      <Form {...form}>
        <form
          className="w-full flex flex-col gap-4"
          onSubmit={form.handleSubmit(Submit)}
        >
          <CustomInput
            control={form.control}
            name="level"
            label="Level Name"
            placeholder="level name "
            type="text"
          />
          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </MainLayout>
  );
};

export default MasterLevelFormPage;
