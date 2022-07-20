import React from "react";
import { Field, FormikProps, ErrorMessage } from "formik";
import { IInitialValues } from "./AddOrEditUser";
import { TextField } from "@mui/material";

interface IProps extends FormikProps<IInitialValues> {
  name: string;
  label: string;
}

const FormikFiled = ({ name, label, errors, submitCount }: IProps) => {
  return (
    <Field
      error={!!submitCount && errors[name as keyof IInitialValues]}
      name={name}
      label={label}
      as={TextField}
      helperText={!!submitCount && <ErrorMessage name={name} />}
    />
  );
};

export default FormikFiled;
