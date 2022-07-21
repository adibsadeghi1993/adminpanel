import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import { useConsumeContext } from "../../context/UserContext";
import type * as types from "../../context/types";

export default function BasicTable() {
  const {
    users,
    handleClickOpen,
    handlePageChange,
    loading,
    pageNo,
    handleDeleteUser,
    handleEditUser,
    pageCount
  } = useConsumeContext();
  console.log(users);

  if (loading) {
    return <h1>loading data ...</h1>;
  }
  return (
    <Box>
      <Box sx={{ my: "50px" }}>
        <Button onClick={handleClickOpen} variant="outlined">
          add new user
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell align="right">email</TableCell>
              <TableCell align="right">position</TableCell>
              <TableCell align="right">gender</TableCell>
              <TableCell align="right">actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((u: types.IUser) => (
                <TableRow>
                  <TableCell>{u.name}</TableCell>
                  <TableCell align="right">{u.email}</TableCell>
                  <TableCell align="right">{u.position}</TableCell>
                  <TableCell align="right">{u.gender}</TableCell>
                  <TableCell align="right">
                    <Button onClick={() => handleEditUser(u.id)}>edit</Button>
                    <Button onClick={() => handleDeleteUser(u.id)}>
                      delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Box
          sx={{ padding: "15px", display: "flex", justifyContent: "center" }}
        >
          <Pagination
            showFirstButton
            showLastButton
            count={pageCount}
            page={pageNo}
            color="primary"
            onChange={handlePageChange}
          />
        </Box>
      </TableContainer>
    </Box>
  );
}
