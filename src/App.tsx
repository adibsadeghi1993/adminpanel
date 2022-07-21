
import UserContext from "./context/UserContext"
import BasicTable from "./components/UserTable/UserTable"
import {Container} from "@mui/material"
import Modal from "./components/Modal"

function App() {
  return (
    <Container maxWidth="lg">
  
    <UserContext>
      <Modal/>
      <BasicTable/>
    </UserContext>

  </Container>
  )
}

export default App;
