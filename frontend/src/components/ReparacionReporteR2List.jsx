import React, { useEffect, useState } from "react";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Select, InputLabel, FormControl, TextField, Box } from "@mui/material";
import reporteService from "../services/reporte.service";

const ReporteList = () => {
  const [reporte, setReporte] = useState([]);
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

  const obtenerDatos = (mes, año) => {
    const numeroMes = mesNumero[mes];
    reporteService
      .getReporte1(numeroMes, año)
      .then((response) => {
        console.log("Mostrando Reporte 1.", response.data);
        setReporte(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar el reporte 1.",
          error
        );
      });
  };

  useEffect(() => {
    obtenerDatos(mesSeleccionado, añoSeleccionado);
  }, [mesSeleccionado, añoSeleccionado]);

  return (
    <>
      <Typography variant="h4" gutterBottom margin={"20px"}>
        Reporte N°1 (HU5)
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
                Lista de reparaciones
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Sedan
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Hatchback
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                SUV
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Pickup
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Furgoneta
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                TOTAL
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reporte.map((fila) => {
              const { tipoReparacion, tipoVehiculoConteo, totalMonto } = fila;
              const totalConteo = Object.values(tipoVehiculoConteo).reduce((sum, val) => sum + val, 0);

              // Cálculo de totales para esta fila
              const totalMontoPorTipo = {
                Sedan: (tipoVehiculoConteo.Sedan || 0) * totalMonto,
                Hatchback: (tipoVehiculoConteo.Hatchback || 0) * totalMonto,
                SUV: (tipoVehiculoConteo.SUV || 0) * totalMonto,
                Pickup: (tipoVehiculoConteo.Pickup || 0) * totalMonto,
                Furgoneta: (tipoVehiculoConteo.Furgoneta || 0) * totalMonto,
                Total: totalConteo * totalMonto
              };

              return (
                <React.Fragment key={tipoReparacion}>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{tipoReparacion}</TableCell>
                    <TableCell align="left">{tipoVehiculoConteo.Sedan || 0}</TableCell>
                    <TableCell align="left">{tipoVehiculoConteo.Hatchback || 0}</TableCell>
                    <TableCell align="left">{tipoVehiculoConteo.SUV || 0}</TableCell>
                    <TableCell align="left">{tipoVehiculoConteo.Pickup || 0}</TableCell>
                    <TableCell align="left">{tipoVehiculoConteo.Furgoneta || 0}</TableCell>
                    <TableCell align="left">{totalConteo}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" />
                    <TableCell align="left">{totalMontoPorTipo.Sedan}</TableCell>
                    <TableCell align="left">{totalMontoPorTipo.Hatchback}</TableCell>
                    <TableCell align="left">{totalMontoPorTipo.SUV}</TableCell>
                    <TableCell align="left">{totalMontoPorTipo.Pickup}</TableCell>
                    <TableCell align="left">{totalMontoPorTipo.Furgoneta}</TableCell>
                    <TableCell align="left">{totalMontoPorTipo.Total}</TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ReporteList;
