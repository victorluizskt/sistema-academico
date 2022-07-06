/* eslint-disable no-unused-vars */
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect, useContext } from "react";
import Repository from "../../../../repositories/repository";
import { AuthContext } from "../../../../providers/auth";

const columns = [
  { id: "matter", label: "Matéria", minWidth: 170 },
  { id: "nota", label: "Nota", minWidth: 100 },
  {
    id: "frequency",
    label: "Frequência",
    minWidth: 170,
    align: "right",
  },
  {
    id: "middleClass",
    label: "Média Turma",
    minWidth: 170,
    align: "right",
  },
  {
    id: "approved",
    label: "Aprovado",
    minWidth: 170,
    align: "right",
  },
  {
    id: "teacher",
    label: "Professor",
    minWidth: 170,
    align: "right",
  },
];

function createData(matter, nota, frequency, middleClass, approved) {
  return { matter, nota, frequency, middleClass, approved };
}

const rows = [
  createData("Intr. Economia", "65", "90%", "72.15", "Sim"),
  createData("Intr. Economia", "65", "90%", "72.15", "Sim"),
  createData("Intr. Economia", "65", "90%", "72.15", "Sim"),
  createData("Intr. Economia", "65", "90%", "72.15", "Sim"),
  createData("Intr. Economia", "65", "90%", "72.15", "Sim"),
  createData("Intr. Economia", "65", "90%", "72.15", "Sim"),
  createData("Intr. Economia", "65", "90%", "72.15", "Sim"),
  createData("Intr. Economia", "65", "90%", "72.15", "Sim"),
  createData("Intr. Economia", "65", "90%", "72.15", "Sim"),
];

const repository = new Repository();

export default function TableContainerStudent() {
  const { user } = useContext(AuthContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // useEffect(() => {
  //   (async () => {
  //     const { data } = repository.getStudentTable(user.registration);
  //     console.log(data);
  //   })();
  // },[]);

  console.log('Oi mundo')

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "90%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {/* {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })} */}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}