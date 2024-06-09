import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import reparacionService from "../services/reparacion.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalAddReparacion from "./ModalAddReparacion";
import Description from "@mui/icons-material/Description";
import Typography from "@mui/material/Typography";

const ReparacionList = () => {
  const [reparacion, setReparacion] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const handLeCloseAdd = () => setShowAdd(false);
  const handLeShowAdd = () => setShowAdd(true);

  const navigate = useNavigate();

  const init = () => {
    reparacionService
      .getAll()
      .then((response) => {
        console.log("Mostrando listado de todas las reparaciones.", response.data);
        setReparacion(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todas las reparaciones.",
          error
        );
      });
  };

  useEffect(() => {
    init();
  }, []);

  const handleDelete = (id) => {
    console.log("Printing id", id);
    const confirmDelete = window.confirm(
      "¿Esta seguro que desea borrar este registro de reparación?"
    );
    if (confirmDelete) {
      reparacionService
        .remove(id)
        .then((response) => {
          console.log("El registro de reparación ha sido eliminado.", response.data);
          init();
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar eliminar el registro de reparación",
            error
          );
        });
    }
  };

  const handleEdit = (id, handLeShowAdd) => {
    console.log("Printing id", id);
    console.log("Printing handLeShow", handLeShowAdd);
    //onClick = {handLeShow};
    navigate(`/reparacion/edit/${id}`);
  };

  return (
    <>
    <Typography variant="h4" gutterBottom margin={"20px"}>
      Historial de Reparaciones
    </Typography>
    <TableContainer component={Paper}>
      <br />
      <Button
          variant="contained"
          color="primary"
          startIcon={<Description />}
          onClick={handLeShowAdd}
        >
          Registrar Reparación
        </Button>
      <br /> <br />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Vehículo
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Tipo Reparación
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Fecha Inicio Reparación
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Fecha Termino Reparación
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Costo Reparación
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Operaciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reparacion.map((reparacion) => (
            <TableRow
              key={reparacion.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{reparacion.patente}</TableCell>
              <TableCell align="left">{reparacion.tipo_reparacion}</TableCell>
              <TableCell align="left">{reparacion.fecha_inicio ? format(new Date(reparacion.fecha_inicio), "dd-MM-yyyy HH:mm") : "No Registra"}</TableCell>
              <TableCell align="left">{reparacion.fecha_termino ? format(new Date(reparacion.fecha_termino), "dd-MM-yyyy HH:mm") : "No Registra"}</TableCell>
              <TableCell align="right">{reparacion.costo_reparacion}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={() => handleEdit(reparacion.id, handLeShowAdd)}
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<EditIcon />}
                >
                  Editar
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(reparacion.id)}
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<DeleteIcon />}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <ModalAddReparacion show={showAdd} handLeClose={handLeCloseAdd}/>
    </>
  );
};

export default ReparacionList;
