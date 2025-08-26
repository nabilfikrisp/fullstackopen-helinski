import { useState, ChangeEvent } from "react";
import { FieldProps } from "../types";

export const useField = (type: string): FieldProps => {
  const [value, setValue] = useState<string>("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};
