"use client";
import React, { useEffect } from "react";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm, useWatch } from "react-hook-form";
import AnnualLeaveAPI from "@/data/AnnualLeaveAPI";
import { toast } from "sonner";
import CustomSelect from "@/components/CustomSelect";
import CustomTextArea from "@/components/CustomTextArea";
import dataType from "@/utils/data/dataTypeLeave";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  date_start: z.string().nonempty("date start cannot be empty"),
  date_end: z.string().nonempty("date end cannot be empty"),
  reason: z.string().nonempty("reason cannot be empty"),
  type: z.string().nonempty("type cannot be empty"),
  count_date: z.string(),
});

const FormRequestLeave = ({ dataRequestLeave }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date_start: new Date(dataRequestLeave?.date_start) || "",
      date_end: new Date(dataRequestLeave?.date_end) || "",
      reason: dataRequestLeave?.reason || "",
      type: dataRequestLeave?.type || "",
      count_date: dataRequestLeave?.data_count || "",
    },
  });

  const dateStart = useWatch({ control: form.control, name: "date_start" });
  const dateEnd = useWatch({ control: form.control, name: "date_end" });

  if (dataRequestLeave) {
    useEffect(() => {
      form.reset({
        date_start: new Date(dataRequestLeave?.date_start)
          .toISOString()
          .split("T")[0],
        date_end: new Date(dataRequestLeave?.date_end)
          .toISOString()
          .split("T")[0],
        reason: dataRequestLeave.reason,
        type: dataRequestLeave.type,
        count_date: dataRequestLeave.data_count || 0,
      });
    }, [dataRequestLeave]);
  }

  useEffect(() => {
    const start = new Date(dateStart);
    const end = new Date(dateEnd);
    if (end < start) {
      form.setValue("date_end", dateStart);
      return;
    }

    const diffTime = end - start;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    if (diffDays) {
      form.setValue("count_date", diffDays.toString());
    }
  }, [dateStart, dateEnd, form.setValue]);

  const Submit = async (data) => {
    const payload = {
      reason: data.reason,
      date_start: new Date(data.date_start),
      date_end: new Date(data.date_end),
      data_count: data.count_date,
      type: data.type,
      ...(dataRequestLeave && { id: dataRequestLeave.id }),
    };

    if (dataRequestLeave) {
      const response = await AnnualLeaveAPI.UpdateAnnualLeave(payload);
      if (response?.status == 200) {
        toast("Successfully", {
          description: response.message,
        });
      }
    } else {
      const response = await AnnualLeaveAPI.PostAnnualLeave(payload);
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
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(Submit)}
      >
        <CustomSelect
          control={form.control}
          name="type"
          data={dataType}
          placeholder={"Select type leave"}
          label="Type Leave"
        />
        <div className="grid grid-cols-3 gap-4">
          <CustomInput
            control={form.control}
            name="date_start"
            label="Date Start"
            type="date"
            className="border border-black"
          />
          <CustomInput
            control={form.control}
            name="date_end"
            label="Date End"
            type="date"
            className="border border-black"
          />
          <CustomInput
            control={form.control}
            name="count_date"
            label="Total Days Leave"
            type="text"
            className="border border-black"
            disabled
          />
        </div>

        <CustomTextArea
          control={form.control}
          label="Reason"
          name="reason"
          placeholder="Write your reason"
        />
        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};
export default FormRequestLeave;
