import React from "react";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Textarea } from "./ui/textarea";

const CustomTextArea = ({ control, name, label, props, placeholder }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              className="resize"
              placeholder={placeholder}
              {...field}
              {...props}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default CustomTextArea;
