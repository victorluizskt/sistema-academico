import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../../providers/auth";
import Repository from "../../../../repositories/repository";

const repository = new Repository();

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "nomeDisciplina", headerName: "Nome Disciplina", width: 100 },
  { field: "CargaHoraria", headerName: "Carga Horária", width: 70 },
  { field: "Sala", headerName: "Sala", width: 90 },
  {
    field: "professor",
    headerName: "Professor",
    // type: 'number',
    width: 90,
  },
  {
    field: "horario",
    headerName: "Horário",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 80,
    // valueGetter: (params) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: "quantidadeMaximaAluno",
    headerName: "Capacidade Máxima de Alunos",
    type: "number",
    width: 130,
  },
];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

export default function TableMatriculaAluno() {
  const [studentData, setStudentData] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const request = {
        MatriculaAluno: user.registration,
      };

      const { data } = await repository.getStudentTable(request);
      setStudentData(data);
      console.log(data);
    })();
  }, []);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
