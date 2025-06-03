"use client";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import SectionAPI from "@/data/SectionAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const MasterSectionFormPage = () => {
  const form = useForm({
    defaultValues: {
      section: "",
    },
  });

  const Submit = async (data) => {
    const response = await SectionAPI.PostSection({ section: data.section });
    if (response?.status == 201) {
      toast("Successfully", {
        description: response.message,
      });
    }
  };

  return (
    <MainLayout title={"Form Master Section"}>
      <Form {...form}>
        <form
          className="w-full flex flex-col gap-4"
          onSubmit={form.handleSubmit(Submit)}
        >
          <CustomInput
            control={form.control}
            name="section"
            label="Section Name"
            placeholder="section name "
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

export default MasterSectionFormPage;
