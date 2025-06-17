import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const CustomInput = ({
  control,
  name,
  field,
  label,
  placeholder,
  type,
  description,
  ...props
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type == "file" ? (
              <Input
                placeholder={placeholder}
                type={type}
                onChange={(e) => field.onChange(e.target?.files?.[0])}
                {...props}
              />
            ) : (
              <Input
                placeholder={placeholder}
                type={type}
                {...field}
                {...props}
              />
            )}
          </FormControl>
          {description ? <FormDescription>{description}</FormDescription> : ""}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomInput;
