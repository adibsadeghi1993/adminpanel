import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { FormikProps } from "formik";
import type * as types from "./types"
import FormHelperText from "@mui/material/FormHelperText";

interface IProps extends FormikProps<types.IInitialValues> {
  name: string;
  label: string;
  items: types.IGender[];
}

const RadioField = ({
  name,
  label,
  items,
  values,
  errors,
  handleChange,
  submitCount,
}: IProps) => {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup value={values.gender} name={name} onChange={handleChange} row>
        {items.map((g) => (
          <FormControlLabel
            key={g.label}
            value={g.value}
            control={<Radio />}
            label={g.label}
          />
        ))}
      </RadioGroup>
      {!!submitCount && errors.gender && (
        <FormHelperText>{errors.gender}</FormHelperText>
      )}
    </FormControl>
  );
};

export default RadioField;
