import { useState } from "react";

export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange({ target }) {
    setValue(target.value);
  }

  return {
    value,
    onChange: handleChange
  };
}
