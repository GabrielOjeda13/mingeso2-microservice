import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import reparacionService from "../services/reparacion.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Description from "@mui/icons-material/Description";
import Typography from "@mui/material/Typography";

const ReporteList = () => {
  const [reporte, setReporte] = useState([]);

  const init = () => {
    reparacionService
      .getReporteR4()
      .then((response) => {
        console.log("Mostrando Reporte R4.", response.data);
        setReporte(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar el reporte R4.",
          error
        );
      });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom margin={"20px"}>
        Reparaciones Vs N° Vehiculos - Por Tipo de Motor (R4)
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Tipo de Reparación
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                N° de Vehículos Gasolina
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                N° de Vehículos Díesel
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                N° de Vehículos Híbrido
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                N° de Vehículos Eléctrico
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Costo Total
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reporte.map((fila) => (
              <TableRow
                key={fila[0]} // Utilizamos la primera columna como clave única, que corresponde al tipo de reparación
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{fila[0]}</TableCell>
                <TableCell align="left">{fila[1]}</TableCell>
                <TableCell align="left">{fila[2]}</TableCell>
                <TableCell align="left">{fila[3]}</TableCell>
                <TableCell align="left">{fila[4]}</TableCell>
                <TableCell align="left">{fila[5]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ReporteList;
