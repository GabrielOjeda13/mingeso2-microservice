import React, { useEffect, useState } from "react";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Select, InputLabel, FormControl, TextField, Box } from "@mui/material";
import reporteService from "../services/reporte.service";

const ReporteList = () => {
  const [reporte, setReporte] = useState([{}, {}, {}]);
  const [mesSeleccionado, setMesSeleccionado] = useState("ABRIL");
  const [añoSeleccionado, setAñoSeleccionado] = useState(2024); // Estado para el año
  const [meses, setMeses] = useState(["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"]);

  // Mapeo del nombre del mes al número
  const mesNumero = {
    "ENERO": 1,
    "FEBRERO": 2,
    "MARZO": 3,
    "ABRIL": 4,
    "MAYO": 5,
    "JUNIO": 6,
    "JULIO": 7,
    "AGOSTO": 8,
    "SEPTIEMBRE": 9,
    "OCTUBRE": 10,
    "NOVIEMBRE": 11,
    "DICIEMBRE": 12
  };

  const calcularVariacion = (valorAnterior, valorActual) => {
    if (valorAnterior === 0) return 0;
    return ((valorActual - valorAnterior) / valorAnterior) * 100;
  };

  const obtenerDatos = (mes, año) => {
    const numeroMes = mesNumero[mes];
    reporteService
      .getReporte2(numeroMes, año)
      .then((response) => {
        console.log("Mostrando Reporte.", response.data);
        setReporte(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar el reporte.",
          error
        );
      });
  };

  useEffect(() => {
    obtenerDatos(mesSeleccionado, añoSeleccionado);
  }, [mesSeleccionado, añoSeleccionado]);

  const [mesActual, mesAnterior1, mesAnterior2] = reporte;

  const tiposReparacion = new Set([
    ...Object.keys(mesActual.cantidadPorTipoReparacion || {}),
    ...Object.keys(mesAnterior1.cantidadPorTipoReparacion || {}),
    ...Object.keys(mesAnterior2.cantidadPorTipoReparacion || {}),
  ]);

  const mesActualNombre = mesSeleccionado;
  const mesAnterior1Nombre = meses[meses.indexOf(mesSeleccionado) - 1] || "Sin Datos";
  const mesAnterior2Nombre = meses[meses.indexOf(mesSeleccionado) - 2] || "Sin Datos";

  return (
    <>
      <Typography variant="h4" gutterBottom margin={"20px"}>
        Reporte N°2 (HU6)
      </Typography>
      <Box display="flex" justifyContent="center" mb={2}>
        <Box display="flex" gap={2} alignItems="center">
        <FormControl sx={{ minWidth: 80 }} margin="normal">
            <TextField
              label="Año"
              type="number"
              variant="standard"
              value={añoSeleccionado}
              onChange={(e) => setAñoSeleccionado(Number(e.target.value))}
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>
          <FormControl sx={{ minWidth: 250 }} margin="normal">
            <InputLabel id="mes-select-label">Selecciona un Mes</InputLabel>
            <Select
              labelId="mes-select-label"
              variant="standard"
              value={mesSeleccionado}
              onChange={(e) => setMesSeleccionado(e.target.value)}
              label="Selecciona un Mes"
            >
              {meses.map((mes) => (
                <MenuItem key={mes} value={mes}>
                  {mes}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Tipo de Reparación
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                {mesActualNombre}
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                % Variación
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                {mesAnterior1Nombre}
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                % Variación
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                {mesAnterior2Nombre}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...tiposReparacion].map(tipo => (
              <>
                <TableRow key={`cantidad-${tipo}`}>
                  <TableCell align="left">{tipo}</TableCell>
                  <TableCell align="left">{mesActual.cantidadPorTipoReparacion[tipo] || 0}</TableCell>
                  <TableCell align="left">
                    {calcularVariacion(mesAnterior1.cantidadPorTipoReparacion[tipo] || 0, mesActual.cantidadPorTipoReparacion[tipo] || 0).toFixed(2)}%
                  </TableCell>
                  <TableCell align="left">{mesAnterior1.cantidadPorTipoReparacion[tipo] || 0}</TableCell>
                  <TableCell align="left">
                    {calcularVariacion(mesAnterior2.cantidadPorTipoReparacion[tipo] || 0, mesAnterior1.cantidadPorTipoReparacion[tipo] || 0).toFixed(2)}%
                  </TableCell>
                  <TableCell align="left">{mesAnterior2.cantidadPorTipoReparacion[tipo] || 0}</TableCell>
                </TableRow>
                <TableRow key={`monto-${tipo}`}>
                  <TableCell align="left" />
                  <TableCell align="left">${mesActual.montoPorTipoReparacion[tipo] || 0}</TableCell>
                  <TableCell align="left">
                    {calcularVariacion(mesAnterior1.montoPorTipoReparacion[tipo] || 0, mesActual.montoPorTipoReparacion[tipo] || 0).toFixed(2)}%
                  </TableCell>
                  <TableCell align="left">${mesAnterior1.montoPorTipoReparacion[tipo] || 0}</TableCell>
                  <TableCell align="left">
                    {calcularVariacion(mesAnterior2.montoPorTipoReparacion[tipo] || 0, mesAnterior1.montoPorTipoReparacion[tipo] || 0).toFixed(2)}%
                  </TableCell>
                  <TableCell align="left">${mesAnterior2.montoPorTipoReparacion[tipo] || 0}</TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ReporteList;
