"use client";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import SectionAPI from "@/data/SectionAPI";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
const FormMasterSectionComponent = ({ dataSection }) => {
  const form = useForm({
    defaultValues: {
      section: "",
    },
  });
  console.log(dataSection);
  if (dataSection) {
    useEffect(() => {
      form.reset({
        section: dataSection.section,
      });
    }, [dataSection]);
  }
  const Submit = async (data) => {
    if (dataSection) {
      const response = await SectionAPI.PutSection({
        id: dataSection.id,
        section: data.section,
      });
      if (response?.status == 200) {
        toast("Successfully", {
          description: response.message,
        });
      }
    } else {
      const response = await SectionAPI.PostSection({ section: data.section });
      if (response?.status == 201) {
        toast("Successfully", {
          description: response.message,
        });
        form.reset();
      }
    }
  };

  return (
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
  );
};

export default FormMasterSectionComponent;
