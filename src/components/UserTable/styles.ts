import { Theme, SxProps } from "@mui/material";

export const editButton: SxProps<Theme> = {
  backgroundColor: (theme) => theme.palette.primary.main,
  mr: "10px",
  color: (theme) => theme.palette.primary.darker,
  ":hover": {
    backgroundColor: (theme) => theme.palette.primary.light,
  },
};
