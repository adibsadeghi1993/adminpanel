import React from "react";
import { Formik, Form } from "formik";
import { Button, TextField } from "@mui/material";
import FormikFiled from "./FormikFiled";
import * as Yup from "yup";
import FormSelect from "./FormSelect";

export interface IInitialValues {
  name: string;
  email: string;
  position: string;
}

export interface IPosition {
  label: string;
  value: string;
}

const postionOptions: IPosition = [
  { label: "frontend", value: "frontend" },
  { label: "backend", value: "backend" },
];

const initilaValues: IInitialValues = {
  name: "",
  email: "",
  position: "",
};

const handleSubmit = (values: IInitialValues) => {
  console.log(values);
};

const validationSchema = Yup.object({
  name: Yup.string().required("please enter your name"),
  email: Yup.string().required("please enter your email"),
});

const AddOrEditUser = () => {
  return (
    <Formik
      initialValues={initilaValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form>
          <FormikFiled {...props} label="name" name="name" />
          <FormikFiled {...props} label="email" name="email" />
          <FormSelect name="postion" label="position" options={postionOptions} />
          <Button type="submit">send</Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddOrEditUser;
