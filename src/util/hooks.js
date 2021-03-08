 
import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    console.log(event);
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    console.log(event);
    callback();
  };

  return {
    onChange,
    onSubmit,
    values
  };
};