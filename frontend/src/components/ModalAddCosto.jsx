import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import costoService from "../services/costo.service";
import reparacionService from "../services/reparacion.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ButtonMui from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox"; 
import vehiculoService from "../services/vehiculo.service";

const AddCosto = ({show, handLeClose}) => {
  const [patente, setPatente] = useState("");
  const [fecha_ingreso, setFechaIngreso] = useState("");
  const [fecha_reparacion, setFechaReparacion] = useState("");
  const [fecha_salida, setFechaSalida] = useState("");
  const [reparaciones, setReparaciones] = useState([]);
  const [selectedReparaciones, setSelectedReparaciones] = useState([]);
  const [costoTotal, setCostoTotal] = useState(0);
  const [descuentoIngreso, setDescuentoIngreso] = useState(0);
  const [descuentoReparaciones, setDescuentoReparaciones] = useState(0);
  const [recargoKm, setRecargoKm] = useState(0);
  const [recargoAño, setRecargoAño] = useState(0);
  const [vehiculoPatente, setVehiculoPatente] = useState("");;
  const { id } = useParams();
  const navigate = useNavigate();
  
  const getReparaciones = (e) => {
    reparacionService
      .getList(e)
      .then((response) => {
        console.log("Mostrando listado de todas las reparaciones.", response.data);
        setReparaciones(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todas las reparaciones.",
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

  const saveCosto = (e) => {
    e.preventDefault();
    const costo = { patente, fecha_ingreso, fecha_reparacion, fecha_salida, id };
        //Crear nuevo Registro de Costo
        costoService
          .create(costo)
          .then((response) => {
            console.log("El registro de costo ha sido añadida.", response.data);
            navigate("/costo/list");
          })
          .catch((error) => {
            console.log(
              "Ha ocurrido un error al intentar registrar el costo.",
              error
            );
          });
  };

  const calcularNumeroReparacionesUltimos12Meses = (reparaciones) => {
    // Obtener la fecha actual
    const fechaActual = new Date();
    // Calcular la fecha hace 12 meses
    const fechaHace12Meses = new Date();
    fechaHace12Meses.setMonth(fechaHace12Meses.getMonth() - 12);
  
    // Filtrar las reparaciones que estén dentro del rango de los últimos 12 meses
    const reparacionesUltimos12Meses = reparaciones.filter((reparacion) => {
      const fechaReparacion = new Date(reparacion.fecha_inicio);
      return fechaReparacion >= fechaHace12Meses && fechaReparacion <= fechaActual;
    });
  
    // Calcular el número de reparaciones
    const numReparacionesUltimos12Meses = reparacionesUltimos12Meses.length;
  
    return numReparacionesUltimos12Meses;
  };

  const calcularDescuentoDiaAtencion = (fechaIngreso) => {
    // Obtener el día de la semana de la fecha de ingreso
    const fecha = new Date(fechaIngreso);
    const diaSemana = fecha.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado

    // Verificar si es lunes o jueves entre las 09:00 y las 12:00 horas
    if ((diaSemana >= 1 && diaSemana <= 4) && fecha.getHours() >= 9 && fecha.getHours() < 12) {
      // Aplicar un descuento del 10% si cumple con las condiciones
      return 0.10;
    } else {
      return 0; // No hay descuento
    }
  };

  const calcularDescuentoReparaciones = () => {
    let num_reparaciones = calcularNumeroReparacionesUltimos12Meses(reparaciones); // Declarar como let
    console.log("num_reparaciones", num_reparaciones);



    const tipoMotor = vehiculoPatente.tipo_motor;
    let descuento_reparacion = 0.05; //base

    //Descuento por tipo motor
    if (tipoMotor === "Diésel") {
      descuento_reparacion = descuento_reparacion + 0.02;
    } else if (tipoMotor === "Híbrido") {
      descuento_reparacion = descuento_reparacion + 0.05;
    } else if (tipoMotor === "Eléctrico") {
      descuento_reparacion = descuento_reparacion + 0.03;
    }
    //console.log("descuento ANTES por las reparaciones.", descuento_reparacion);

    //Descuento por numero de reparaciones
    if (num_reparaciones >=3 && num_reparaciones <= 5) {
      descuento_reparacion += 0.05;};

    if (num_reparaciones >=6 && num_reparaciones <= 9) {
      descuento_reparacion += 0.1;};

    if (num_reparaciones >=10) {
      descuento_reparacion += 0.15;
    };
    // Truncar a dos cifras decimales, Esto se hizo para evitar errores en la formula ya que derrepende se bugea
    descuento_reparacion = parseFloat(descuento_reparacion.toFixed(2));
    //console.log("descuento por las reparaciones.", descuento_reparacion);
    return descuento_reparacion;
  };

  const calcularRecargoKilometraje = () => {
    const kilometraje = vehiculoPatente.km;
    const tipoVehiculo = vehiculoPatente.tipo_vehiculo;
    if (kilometraje <= 5000) {
      return 0;}; // No hay recargo

    if (kilometraje >= 5000 && kilometraje <= 12000) {
      if (tipoVehiculo == "Sedan" || tipoVehiculo == "Hatchback"){
        return 0.03;
      } else{ return 0.05;}}; //Para el caso de los demas tipos de vehiculos

    if (kilometraje > 12000 && kilometraje <= 25000) {
        if (tipoVehiculo == "Sedan" || tipoVehiculo == "Hatchback"){
          return 0.07;
        } else{ return 0.09;}}; //Para el caso de los demas tipos de vehiculos
    
    if (kilometraje >= 25001 && kilometraje <= 40000) {
      return 0.12;
    };

    if (kilometraje >= 40001) {
      return 0.2;
    };
    return 0;
  };

  const calcularRecargoAño= () => {
    const año = vehiculoPatente.año;
    const tipoVehiculo = vehiculoPatente.tipo_vehiculo;
    const antiguedad = 2024-año;
    if (antiguedad <= 5) {
      return 0;}; // No hay recargo

    if (antiguedad >= 6 && antiguedad <= 10) {
      if (tipoVehiculo == "Sedan" || tipoVehiculo == "Hatchback"){
        return 0.05;
      } else{ return 0.7;}}; //Para el caso de los demas tipos de vehiculos

    if (antiguedad >= 11 && antiguedad <= 15) {
        if (tipoVehiculo == "Sedan" || tipoVehiculo == "Hatchback"){
          return 0.09;
        } else{ return 0.11;}}; //Para el caso de los demas tipos de vehiculos
    
    if (antiguedad >= 16) {
      if (tipoVehiculo == "Sedan" || tipoVehiculo == "Hatchback"){
        return 0.15;
      } else{ return 0.2;}}; //Para el caso de los demas tipos de vehiculos

    return 0;
  };

  const calcularCostoTotalReparaciones = () => {
    // Calcular el costo total de las reparaciones seleccionadas
    let total = selectedReparaciones.reduce((acc, reparacion) => acc + reparacion.costo_reparacion, 0);

    return total;
  };

  const calcularCostoTotal = () => {
    // Calcular el costo total de las reparaciones seleccionadas
    let total = selectedReparaciones.reduce((acc, reparacion) => acc + reparacion.costo_reparacion, 0);
    let totalFinal = total; //Variable aux que se utiliza para calcular el monto final, dado que el total se utiliza para calcular los montos de descuentos y recargos.
    // Aplicar el descuento si corresponde
    totalFinal -= total * descuentoReparaciones;
    // Aplicar el descuento si corresponde
    totalFinal -= total * descuentoIngreso;
    // Aplicar recargo por kilometraje
    totalFinal += total * recargoKm;
    // Aplicar recargo por Año
    totalFinal += total * recargoAño;
    return totalFinal;
  };

  const handleSeleccionReparacion = (reparacion) => {
    // Verificar si la reparación ya está seleccionada
    const index = selectedReparaciones.findIndex((rep) => rep.id === reparacion.id);
    if (index !== -1) {
      // Si está seleccionada, quitarla de la lista
      setSelectedReparaciones(selectedReparaciones.filter((rep) => rep.id !== reparacion.id));
      // Restar el costo de la reparación deseleccionada al costo total
      setCostoTotal(costoTotal - reparacion.costo_reparacion);
    } else {
      // Si no está seleccionada, agregarla a la lista
      setSelectedReparaciones([...selectedReparaciones, reparacion]);
      // Sumar el costo de la reparación seleccionada al costo total
      setCostoTotal(costoTotal + reparacion.costo_reparacion);
    }
  };

  useEffect(() => {
    // Recalcular el costo total cada vez que la fecha de ingreso cambie
    setCostoTotal(calcularCostoTotal());
  }, [selectedReparaciones, fecha_ingreso]);

  useEffect(() => {
    // Recalcular el costo total cada vez que la Patente cambie
    setCostoTotal(calcularCostoTotal());
    // Calcular el descuento por número de reparaciones
    const descuentoReparaciones = calcularDescuentoReparaciones();
    setDescuentoReparaciones(descuentoReparaciones);
  }, [reparaciones]);

  useEffect(() => {
    // Recalcular el costo total cada vez que la Fecha de ingreso cambie
    setCostoTotal(calcularCostoTotal());
    //Calcular descuento por n° de reparaciones.
    const descuentoReparaciones = calcularDescuentoReparaciones();
    setDescuentoReparaciones(descuentoReparaciones);
    // Calcular el descuento por día de atención
    const descuentoIngreso = calcularDescuentoDiaAtencion(fecha_ingreso);
    setDescuentoIngreso(descuentoIngreso);
  }, [fecha_ingreso, descuentoReparaciones]);

  useEffect(() => {
    // Recalcular el costo total cada vez que la Patente cambie
    setCostoTotal(calcularCostoTotal());
    // Calcular el descuento por día de atención
    const recargoKm = calcularRecargoKilometraje(vehiculoPatente.km);
    setRecargoKm(recargoKm);
    const recargoAño = calcularRecargoAño(vehiculoPatente.año);
    setRecargoAño(recargoAño);
  }, [vehiculoPatente.km, vehiculoPatente.año]);

  return (
    <Modal show={show} onHide={handLeClose} size="xl" scrollable>
        <Modal.Header closeButton>
            <Modal.Title>Nueva Registro de Costo</Modal.Title>
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
                      getReparaciones(e.target.value);
                      getVehiculoPatente(e.target.value);
                    }}
                    helperText="Ej. AABB69"
                    style={{margin:"8px"}}
                    required
                />
                </FormControl>
                <FormControl fullWidth>
                <TextField
                    id="fechaIngreso"
                    label="Fecha de Ingreso"
                    type="datetime-local"
                    value={fecha_ingreso}
                    variant="standard"
                    onChange={(e) => setFechaIngreso(e.target.value)}
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
                    id="fechaReparacion"
                    label="Fecha de Reparación"
                    type="datetime-local"
                    value={fecha_reparacion}
                    variant="standard"
                    onChange={(e) => setFechaReparacion(e.target.value)}
                    helperText="Ej. 02-04-2024"
                    style={{margin:"8px"}}
                    InputLabelProps={{
                      shrink: true,
                      }}
                />
                </FormControl>
                <FormControl fullWidth>
                <TextField
                    id="fechaSalida"
                    label="Fecha de Salida"
                    type="datetime-local"
                    value={fecha_salida}
                    variant="standard"
                    onChange={(e) => setFechaSalida(e.target.value)}
                    helperText="Ej. 02-04-2024"
                    style={{margin:"8px"}}
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

            <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Vehículo
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Tipo de Reparación
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Fecha Inicio Reparación
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Fecha Termino Reparación
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Costo Reparación
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Seleccionar
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
            {reparaciones.map((reparacion, index) => (
              <TableRow key={index}>
                <TableCell align="left">{reparacion.patente}</TableCell>
                <TableCell align="left">{reparacion.tipo_reparacion}</TableCell>
                <TableCell align="left">{reparacion.fecha_inicio ? format(new Date(reparacion.fecha_inicio), "dd-MM-yyyy HH:mm") : "No Registra"}</TableCell>
                <TableCell align="left">{reparacion.fecha_termino ? format(new Date(reparacion.fecha_termino), "dd-MM-yyyy HH:mm") : "No Registra"}</TableCell>
                <TableCell align="left">{reparacion.costo_reparacion}</TableCell>
                <TableCell align="left">
                  <Checkbox
                    checked={selectedReparaciones.some((r) => r.id === reparacion.id)}
                    onChange={() => handleSeleccionReparacion(reparacion)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
          <h5 style={{marginTop:"15px"}}>Costo Total Reparaciones: {calcularCostoTotalReparaciones()}</h5>
          <h6>Descuento por N° Reparaciones :  - {calcularCostoTotalReparaciones() * descuentoReparaciones} ({descuentoReparaciones*100}%)</h6>
          <h6>Descuento por Ingreso         :  - {calcularCostoTotalReparaciones() * descuentoIngreso} (10%)</h6>
          <h6>Recargo por Kilometraje       :  + {calcularCostoTotalReparaciones() * recargoKm} ({recargoKm*100}%)</h6>
          <h6>Recargo por Antigüedad        :  + {calcularCostoTotalReparaciones() * recargoAño} ({recargoAño*100}%)</h6>
          <h4>Costo Total: {calcularCostoTotal()}</h4>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secundary" onClick={handLeClose}>Cancelar</Button>
            <Button
                variant="primary"
                color="info"
                onClick={(e) => {
                    saveCosto(e);
                    handLeClose();
                    window.confirm("\u2714 ¡El registro de costo se creó correctamente!");
                    window.location.reload();
                }}
                    style={{ margin: "10px 10px 10px 10px", padding: "10px 10px 10px 10px"}}>Registrar</Button>
        </Modal.Footer>
    </Modal>
  );
};

export default AddCosto;
