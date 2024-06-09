import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import tablaprecioService from "../services/tablaprecio.service";
import Typography from "@mui/material/Typography";


const TablaPrecioList = () => {
  const [precio, setPrecio] = useState([]);

  const init = () => {
    tablaprecioService
      .getAll()
      .then((response) => {
        console.log("Mostrando listado de todos los Precios", response.data);
        setPrecio(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todos los Precios.",
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
      Listado de Precios
    </Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              N°
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Tipo de Reparación
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Gasolina
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Diésel
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Híbrido
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Eléctrico
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {precio.map((precio) => (
            <TableRow
              key={precio.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{precio.number}</TableCell>
              <TableCell align="left">{precio.tipo_reparacion}</TableCell>
              <TableCell align="right">{precio.gasolina}</TableCell>
              <TableCell align="right">{precio.diesel}</TableCell>
              <TableCell align="right">{precio.hibrido}</TableCell>
              <TableCell align="right">{precio.electrico}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default TablaPrecioList;
