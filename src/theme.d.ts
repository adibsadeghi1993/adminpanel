import { ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    status: {
      danger: React.CSSProperties["color"];
    };
  }

  interface CustomPalette {
    neutral: {
      main: string;
    };
  }

  interface PaletteColorOptions {
    darker?: string;
    main: string;
  }
  interface PaletteColor {
    darker?: string;
    main: string;
  }

  interface PaletteOptions extends CustomPalette {}
  interface Palette extends CustomPalette {}
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}
