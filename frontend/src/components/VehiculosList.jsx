import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import vehiculoService from "../services/vehiculo.service";
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
import ModalAddVehiculo from "./ModalAddVehiculo";
import DirectionsCar from "@mui/icons-material/DirectionsCar";
import Typography from "@mui/material/Typography";

const VehiculoList = () => {
  const [vehiculo, setVehiculo] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const handLeCloseAdd = () => setShowAdd(false);
  const handLeShowAdd = () => setShowAdd(true);

  const navigate = useNavigate();

  const init = () => {
    vehiculoService
      .getAll()
      .then((response) => {
        console.log("Mostrando listado de todos los Vehiculos.", response.data);
        setVehiculo(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todos los Vehículos.",
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
      "¿Esta seguro que desea borrar este Vehículo?"
    );
    if (confirmDelete) {
      vehiculoService
        .remove(id)
        .then((response) => {
          console.log("Vehículo ha sido eliminado.", response.data);
          init();
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar eliminar al Vehículo",
            error
          );
        });
    }
  };

  const handleEdit = (id, handLeShowAdd) => {
    console.log("Printing id", id);
    console.log("Printing handLeShow", handLeShowAdd);
    //onClick = {handLeShow};
    navigate(`/vehiculo/edit/${id}`);
  };

  return (
    <>
    <Typography variant="h4" gutterBottom margin={"20px"}>
      Registro de Vehículos
    </Typography>
    <TableContainer component={Paper}>
      <br />
      <Button
          variant="contained"
          color="primary"
          startIcon={<DirectionsCar />}
          onClick={handLeShowAdd}
        >
          Añadir Vehículo
        </Button>
      <br /> <br />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Patente
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Marca
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Modelo
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Tipo Vehículo
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Tipo Motor
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Año
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Operaciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehiculo.map((vehiculo) => (
            <TableRow
              key={vehiculo.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{vehiculo.patente}</TableCell>
              <TableCell align="left">{vehiculo.marca}</TableCell>
              <TableCell align="right">{vehiculo.modelo}</TableCell>
              <TableCell align="right">{vehiculo.tipo_vehiculo}</TableCell>
              <TableCell align="right">{vehiculo.tipo_motor}</TableCell>
              <TableCell align="right">{vehiculo.año ? vehiculo.año : "No Registra"}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={() => handleEdit(vehiculo.id, handLeShowAdd)}
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<EditIcon />}
                >
                  Editar
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(vehiculo.id)}
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
    <ModalAddVehiculo show={showAdd} handLeClose={handLeCloseAdd}/>
    </>
  );
};

export default VehiculoList;
