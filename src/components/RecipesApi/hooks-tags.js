import { useState } from "react";

export function useFormTagsInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  const handleTagsChange = id => ({ target }) => {
    const tag = initialValue.value.find(i => id === i._id);
    tag[value.name] = target.value;

    setValue(target.value);
  };

  return {
    value,
    onChange: handleTagsChange
  };
}
