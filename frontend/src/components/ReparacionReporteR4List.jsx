import React, { useEffect, useState } from "react";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import reporteService from "../services/reporte.service";

const ReporteList = () => {
  const [reporte, setReporte] = useState([]);

  const init = () => {
    reporteService
      .getReporte1()
      .then((response) => {
        console.log("Mostrando Reporte R2.", response.data);
        setReporte(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar el reporte R2.",
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
        Reporte N°2 (HU6)
      </Typography>
      <TableContainer component={Paper}>
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
