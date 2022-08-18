import { Theme, SxProps } from "@mui/material";

export const titleBox: SxProps<Theme> = {
  marginTop: 10,
};

export const adibBox: SxProps<Theme> = {
  backgroundColor: (theme) => theme.palette.neutral.main,
  width: 100,
  height: 100,
};


