import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import reparacionService from "../services/reparacion.service";
import tablaPrecioService from "../services/tablaprecio.service";
import vehiculoService from "../services/vehiculo.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ButtonMui from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";

const AddReparacion = ({show, handLeClose}) => {
  const [patente, setPatente] = useState("");
  const [tipo_reparacion, setTipoReparacion] = useState("");
  const [fecha_inicio, setFechaInicio] = useState("");
  const [fecha_termino, setFechaTermino] = useState("");
  const [costoReparacionTipo, setCostoReparacionTipo] = useState("");
  const [vehiculoPatente, setVehiculoPatente] = useState("");;
  const { id } = useParams();
  const navigate = useNavigate();
  
  const getTablaPrecio = (tipo) => {
    tablaPrecioService
      .getTipo(tipo)
      .then((response) => {
        console.log("Mostrando costo de reparación por tipo.", response.data);
        setCostoReparacionTipo(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar costo de reparación por tipo.",
          error
        );
      });
  };

  const getVehiculoPatente = (patente) => {
    vehiculoService
      .getVehiculo(patente)
      .then((response) => {
        console.log("Mostrando el vehiculo por patente.", response.data);
        setVehiculoPatente(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar obtener el km del vehiculo.",
          error
        );
      });
  };

  const saveReparacion = (e) => {
    e.preventDefault();
    let costo_reparacion = 0;
    const motor = vehiculoPatente.tipo_motor;

    if (motor === "Gasolina") {
      costo_reparacion = costoReparacionTipo.gasolina;
    } else if (motor === "Diésel") {
      costo_reparacion = costoReparacionTipo.diesel;
    } else if (motor === "Híbrido") {
      costo_reparacion = costoReparacionTipo.hibrido;
    } else if (motor === "Eléctrico") {
      costo_reparacion = costoReparacionTipo.electrico;
    }  

    const reparacion = { patente, tipo_reparacion, fecha_inicio, fecha_termino, costo_reparacion, id };
      //Crear nueva Reparacion
      reparacionService
        .create(reparacion)
        .then((response) => {
          console.log("La reparación ha sido añadida.", response.data);
          navigate("/reparacion/list");
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar registrar una reparación.",
            error
          );
        });
  };


  return (
    <Modal show={show} onHide={handLeClose}>
        <Modal.Header closeButton>
            <Modal.Title>Nueva Reparación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            component="form"
            >
            <hr />
                <FormControl fullWidth>
                <TextField
                    id="patente"
                    label="Patente"
                    value={patente}
                    variant="standard"
                    onChange={(e) => {
                      setPatente(e.target.value);
                      getVehiculoPatente(e.target.value);}}
                    helperText="Ej. AABB69"
                    style={{margin:"8px"}}
                />
                </FormControl>
                <FormControl fullWidth>
                <TextField
                    id="tipoReparacion"
                    label="Tipo Reparación"
                    value={tipo_reparacion}
                    select
                    variant="standard"
                    //defaultValue="Sistema de Frenos"
                    onChange={(e) => {
                      setTipoReparacion(e.target.value);
                      getTablaPrecio(e.target.value)}}
                    style={{margin:"8px"}}
                >
                    <MenuItem value={"Sistema de Frenos"}>Sistema de Frenos</MenuItem>
                    <MenuItem value={"Sistema de Refrigeración"}>Sistema de Refrigeración</MenuItem>
                    <MenuItem value={"Motor"}>Motor</MenuItem>
                    <MenuItem value={"Transmisión"}>Transmisión</MenuItem>
                    <MenuItem value={"Sistema Eléctrico"}>Sistema Eléctrico</MenuItem>
                    <MenuItem value={"Sistema de Escape"}>Sistema de Escape</MenuItem>
                    <MenuItem value={"Neumáticos y Ruedas"}>Neumáticos y Ruedas</MenuItem>
                    <MenuItem value={"Suspensión y la Dirección"}>Suspensión y la Dirección</MenuItem>
                    <MenuItem value={"Sistema de Aire Acondicionado y Calefacción"}>Sistema de Aire Acondicionado y Calefacción</MenuItem>
                    <MenuItem value={"Sistema de Combustible"}>Sistema de Combustible</MenuItem>
                    <MenuItem value={"Reemplazo del Parabrisas y Cristales"}>Reemplazo del Parabrisas y Cristales</MenuItem>
                </TextField>
                </FormControl>

                <FormControl fullWidth>
                <TextField
                    id="fechaInicio"
                    label="Fecha Inicio Reparación"
                    type="datetime-local"
                    value={fecha_inicio}
                    variant="standard"
                    onChange={(e) => setFechaInicio(e.target.value)}
                    helperText="Ej. 02-04-2024"
                    style={{margin:"8px"}}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                />
                </FormControl>
                <FormControl fullWidth>
                <TextField
                    id="fechaTermino"
                    label="Fecha Termino Reparación"
                    type="datetime-local"
                    value={fecha_termino}
                    variant="standard"
                    onChange={(e) => setFechaTermino(e.target.value)}
                    helperText="Ej. 02-04-2024"
                    style={{margin:"8px"}}
                    required
                    InputLabelProps={{
                      shrink: true,
                      }}
                />
                </FormControl>

                <FormControl>
                <br />
                </FormControl>
            <hr />
            </Box>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secundary" onClick={handLeClose}>Cancelar</Button>
            <Button
                variant="primary"
                color="info"
                onClick={(e) => {
                    saveReparacion(e);
                    handLeClose();
                    window.confirm("\u2714 ¡El registro de reparación se creó correctamente!");
                    window.location.reload();
                }}
                    style={{ margin: "10px 10px 10px 10px", padding: "10px 10px 10px 10px"}}>Registrar</Button>
        </Modal.Footer>
    </Modal>
  );
};

export default AddReparacion;
