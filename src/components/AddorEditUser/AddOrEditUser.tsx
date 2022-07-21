import React from "react";
import { Formik, Form } from "formik";
import { Button, Container } from "@mui/material";
import FormikFiled from "./FormikFiled";
import * as Yup from "yup";
import FormSelect from "./FormSelect";
import RadioField from "./RadioField";
import { Grid } from "@mui/material";
import type * as types from "./types"
import { useConsumeContext } from "../../context/UserContext";



const genderItem:types.IGender[] = [
  { label: "Male", value: 0 },
  { label: "Female", value: 1 },
];

const postionOptions: types.IPosition[] = [
  { label: "frontend", value: "frontend" },
  { label: "backend", value: "backend" },
];





const validationSchema = Yup.object({
  name: Yup.string().required("please enter your name"),
  email: Yup.string().required("please enter your email"),
  position: Yup.string().required("please enter your position"),
  gender: Yup.number().required("please check your gender"),
});

const AddOrEditUser = () => {

  const {mode,addNewUser,edit,EditUser}=useConsumeContext()

  const initilaValues: types.IInitialValues =edit.data? {
    name: edit.data.name,
    email: edit.data.email,
    position: edit.data.position,
    gender: edit.data.gender,
  }:{
    name: "",
    email: "",
    position: "",
    gender: 0,
  }

  const handleSubmit = (values: types.IInitialValues) => {
    if(mode==="add"){
      addNewUser(values)
    }else{
      EditUser(values)
    }
    console.log(values);
  };

  return (
    <Container maxWidth="md">
      <Formik
        initialValues={initilaValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                {" "}
                <FormikFiled {...props} label="name" name="name" />
              </Grid>
              <Grid item xs={6}>
                <FormikFiled {...props} label="email" name="email" />
              </Grid>
              <Grid item xs={6}>
                <FormSelect
                  name="position"
                  label="position"
                  options={postionOptions}
                  {...props}
                />
              </Grid>
              <Grid item xs={6}>
                <RadioField
                  items={genderItem}
                  {...props}
                  name="gender"
                  label="gender"
                />
              </Grid>
            </Grid>

            <Button variant="contained" type="submit">
              send
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddOrEditUser;
