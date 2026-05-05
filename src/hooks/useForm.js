import { useState } from "react";
export function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  function handleChange(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }
  return { values, setValues, handleChange };
}
