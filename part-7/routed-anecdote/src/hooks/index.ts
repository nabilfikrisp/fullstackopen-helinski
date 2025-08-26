import { useState } from "react";

type InputType = React.InputHTMLAttributes<HTMLInputElement>["type"];

export const useField = (type: InputType) => {
  const [value, setValue] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    reset,
  };
};
