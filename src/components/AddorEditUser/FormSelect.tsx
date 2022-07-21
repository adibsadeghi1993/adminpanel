import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FormikProps } from "formik";
import type * as types from "./types"
import FormHelperText from '@mui/material/FormHelperText';


interface IProps extends FormikProps<types.IInitialValues> {
  name: string;
  label: string;
  options:types.IPosition[];
}

const FormSelect = ({
  name,
  label,
  options,
  errors,
  submitCount,
  values,
  handleChange,
}: IProps) => {
  return (
    <Box>
      <FormControl fullWidth error={!!submitCount && !!errors.position}>
        <InputLabel>{label}</InputLabel>
        <Select value={values.position} name={name} onChange={handleChange}>
          {options.map((item) => (
            <MenuItem key={item.label} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      {!!submitCount && errors.position && <FormHelperText>{errors.position}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default FormSelect;
