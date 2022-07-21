import React from "react";
import { Field, FormikProps, ErrorMessage } from "formik";
import { TextField } from "@mui/material";
import type * as types from "./types";

interface IProps extends FormikProps<types.IInitialValues> {
  name: string;
  label: string;
}

const FormikFiled = ({ name, label, errors, submitCount }: IProps) => {
  return (
    <Field
      error={!!submitCount && errors[name as keyof types.IInitialValues]}
      name={name}
      fullWidth
      label={label}
      as={TextField}
      helperText={!!submitCount && <ErrorMessage name={name} />}
    />
  );
};

export default FormikFiled;
