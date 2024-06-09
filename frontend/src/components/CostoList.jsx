import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import costoService from "../services/costo.service";
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
import ModalAddCosto from "./ModalAddCosto";
import ModalAddReparacion from "./ModalAddReparacion";
import Description from "@mui/icons-material/Description";

const CostoList = () => {
  const [costo, setCosto] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const handLeCloseAdd = () => setShowAdd(false);
  const handLeShowAdd = () => setShowAdd(true);

  const navigate = useNavigate();

  const init = () => {
    costoService
      .getAll()
      .then((response) => {
        console.log("Mostrando listado de todas los registros de costos.", response.data);
        setCosto(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todos los registros de costos.",
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
      "¿Esta seguro que desea borrar este registro de costo?"
    );
    if (confirmDelete) {
      costoService
        .remove(id)
        .then((response) => {
          console.log("El registro de costo ha sido eliminado.", response.data);
          init();
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar eliminar el registro de costo",
            error
          );
        });
    }
  };

  const handleEdit = (id, handLeShowAdd) => {
    console.log("Printing id", id);
    console.log("Printing handLeShow", handLeShowAdd);
    //onClick = {handLeShow};
    navigate(`/costo/edit/${id}`);
  };

  return (
    <>
    <TableContainer component={Paper}>
      <br />
      <Button
          variant="contained"
          color="primary"
          startIcon={<Description />}
          onClick={handLeShowAdd}
        >
          Registrar Costo
        </Button>
      <br /> <br />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Patente
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Fecha Ingreso
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Fecha Reparación
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Fecha Salida
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Costo Total
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Operaciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {costo.map((costo) => (
            <TableRow
              key={costo.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{costo.patente}</TableCell>
              <TableCell align="left">{costo.fecha_ingreso ? format(new Date(costo.fecha_ingreso), "dd-MM-yyyy HH:mm") : "No Registra"}</TableCell>
              <TableCell align="left">{costo.fecha_reparacion ? format(new Date(costo.fecha_reparacion), "dd-MM-yyyy HH:mm") : "No Registra"}</TableCell>
              <TableCell align="left">{costo.fecha_salida ? format(new Date(costo.fecha_salida), "dd-MM-yyyy HH:mm") : "No Registra"}</TableCell>
              <TableCell align="right">{costo.costo_reparacion}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={() => handleEdit(costo.id, handLeShowAdd)}
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<EditIcon />}
                >
                  Editar
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(costo.id)}
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
    <ModalAddCosto show={showAdd} handLeClose={handLeCloseAdd}/>
    </>
  );
};

export default CostoList;
