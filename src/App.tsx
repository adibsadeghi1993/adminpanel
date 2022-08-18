import UserContext from "./context/UserContext";
import BasicTable from "./components/UserTable/UserTable";
import { Container } from "@mui/material";
import Modal from "./components/Modal";
import * as styles from "./styles";
import Box from "@mui/material/Box";
import { colors } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#e5c0cc",
      darker: "#380516",
    },
    neutral: {
      main: "#f55a2a",
    },
  },
});

function App() {



  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={styles.titleBox}>
        <UserContext>
          <Modal />
          <BasicTable />
        </UserContext>
        <Box sx={styles.adibBox}>adib</Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
