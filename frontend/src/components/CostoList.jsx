import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import costoService from "../services/costo.service";
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
import ModalAddCosto from "./ModalAddCosto";
import ModalAddReparacion from "./ModalAddReparacion";
import Description from "@mui/icons-material/Description";

const CostoList = () => {
  const [costo, setCosto] = useState([]);
  const [vehiculo, setVehiculo] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const navigate = useNavigate();

  const handLeCloseAdd = () => setShowAdd(false);
  const handLeShowAdd = () => setShowAdd(true);

  useEffect(() => {
    init();
    getVehiculoList();
  }, []);

  const init = () => {
    costoService
      .getAll()
      .then((response) => {
        console.log("Mostrando listado de todos los registros de costos.", response.data);
        setCosto(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todos los registros de costos.",
          error
        );
      });
  };

  const getVehiculoList = () => {
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

  const handleDelete = (id) => {
    console.log("Printing id", id);
    const confirmDelete = window.confirm(
      "¿Está seguro que desea borrar este registro de costo?"
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
    navigate(`/costo/edit/${id}`);
  };

  const findVehiculo = (patente) => {
    return vehiculo.find((v) => v.patente === patente) || {};
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
                Patente Vehículo
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Marca Vehículo
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Modelo Vehículo
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Tipo Vehículo
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Año Fabricación
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Tipo Motor
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Fecha Ingreso Taller
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Hora Ingreso Taller
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Monto Total Reparaciones
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Monto Recargos
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Monto Dctos
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                SUB Total
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Monto IVA
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Costo Total
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Fecha Salida taller
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Hora Salida Taller
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Fecha Retiro Cliente
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Hora Retiro Cliente
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {costo.map((item) => {
              const vehiculoInfo = findVehiculo(item.patente);
              return (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{item.patente}</TableCell>
                  <TableCell align="left">{vehiculoInfo.marca || "No Registra"}</TableCell>
                  <TableCell align="left">{vehiculoInfo.modelo || "No Registra"}</TableCell>
                  <TableCell align="left">{vehiculoInfo.tipo_vehiculo || "No Registra"}</TableCell>
                  <TableCell align="left">{vehiculoInfo.ano_fabricacion || "No Registra"}</TableCell>
                  <TableCell align="left">{vehiculoInfo.tipo_motor || "No Registra"}</TableCell>
                  <TableCell align="left">
                    {item.fecha_ingreso
                      ? format(new Date(item.fecha_ingreso), "dd-MM-yyyy")
                      : "No Registra"}
                  </TableCell>
                  <TableCell align="left">
                    {item.fecha_ingreso
                      ? format(new Date(item.fecha_ingreso), "HH:mm")
                      : "No Registra"}
                  </TableCell>
                  <TableCell align="left">{item.total_reparaciones}</TableCell>
                  <TableCell align="left">{item.total_recargos}</TableCell>
                  <TableCell align="left">{item.total_descuentos}</TableCell>
                  <TableCell align="left">{item.subtotal}</TableCell>
                  <TableCell align="left">{item.total_iva}</TableCell>
                  <TableCell align="left">{item.costo_total}</TableCell>
                  <TableCell align="left">
                    {item.fecha_salida
                      ? format(new Date(item.fecha_salida), "dd-MM-yyyy")
                      : "No Registra"}
                  </TableCell>
                  <TableCell align="left">
                    {item.fecha_salida
                      ? format(new Date(item.fecha_salida), "HH:mm")
                      : "No Registra"}
                  </TableCell>
                  <TableCell align="left">
                    {item.fecha_retiro
                      ? format(new Date(item.fecha_retiro), "dd-MM-yyyy")
                      : "No Registra"}
                  </TableCell>
                  <TableCell align="left">
                    {item.fecha_retiro
                      ? format(new Date(item.fecha_retiro), "HH:mm")
                      : "No Registra"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      onClick={() => handleEdit(item.id, handLeShowAdd)}
                      style={{ marginLeft: "0.5rem" }}
                      startIcon={<EditIcon />}
                    >
                      Editar
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(item.id)}
                      style={{ marginLeft: "0.5rem" }}
                      startIcon={<DeleteIcon />}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalAddCosto show={showAdd} handLeClose={handLeCloseAdd} />
    </>
  );
};

export default CostoList;
