"use client";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import LevelAPI from "@/data/LevelAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  level: z.string().min(2, {
    message: "level cannot be empty",
  }),
});
const FormMasterLevelComponent = ({ dataLevel }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      level: "",
    },
  });

  if (dataLevel) {
    useEffect(() => {
      form.reset({
        level: dataLevel.level,
      });
    }, [dataLevel]);
  }
  const Submit = async (data) => {
    if (dataLevel) {
      const response = await LevelAPI.UpdateLevel({
        id: dataLevel.id,
        level: data.level,
      });
      if (response?.status == 200) {
        toast("Successfully", {
          description: response.message,
        });
      }
    } else {
      const response = await LevelAPI.PostLevel({ level: data.level });
      if (response?.status == 201) {
        toast("Successfully", {
          description: response.message,
        });
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
  );
};

export default FormMasterLevelComponent;
