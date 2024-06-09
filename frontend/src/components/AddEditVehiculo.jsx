import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import vehiculoService from "../services/vehiculo.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";

const AddEditVehiculo = () => {
  const [patente, setPatente] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [tipo_vehiculo, setTipoVehiculo] = useState("");
  const [tipo_motor, setTipoMotor] = useState("");
  const [año, setAño] = useState("");
  const [km, setKm] = useState("");
  const { id } = useParams();
  const [titleVehiculoForm, setTitleVehiculoForm] = useState("");
  const navigate = useNavigate();

  const updateVehiculo = (e) => {
    window.confirm("\u2714 ¡El vehículo se actualizó correctamente!");
    navigate("/vehiculo/list");
    window.location.reload();
    e.preventDefault();

  const vehiculo = { patente, marca, modelo, tipo_vehiculo, tipo_motor, año, km, id };
    if (id) {
      vehiculoService
        .update(vehiculo)
        .then((response) => {
          console.log("Vehículo ha sido actualizado.", response.data);
          navigate("/vehiculo/list");
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar actualizar datos del Vehículo.",
            error
          );
        });
    }
  };

  useEffect(() => {
    if (id) {
      setTitleVehiculoForm("Editar Vehículo");
      vehiculoService
        .get(id)
        .then((vehiculo) => {
          setPatente(vehiculo.data.patente);
          setMarca(vehiculo.data.marca);
          setModelo(vehiculo.data.modelo);
          setTipoVehiculo(vehiculo.data.tipo_vehiculo);
          setTipoMotor(vehiculo.data.tipo_motor);
          setAño(vehiculo.data.año);
          setKm(vehiculo.data.km);
        })
        .catch((error) => {
          console.log("Se ha producido un error.", error);
        });
    } else {
      setTitleVehiculoForm("Nuevo Vehículo");
    }
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      component="form"
    >
      <h3> {titleVehiculoForm} </h3>
      <hr />
      <form>
        <FormControl fullWidth>
          <TextField
            id="patente"
            label="Patente"
            value={patente}
            variant="standard"
            onChange={(e) => setPatente(e.target.value)}
            helperText="Ej. AABB69"
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="marca"
            label="Marca"
            value={marca}
            variant="standard"
            onChange={(e) => setMarca(e.target.value)}
            helperText="Ej. Audi"
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="modelo"
            label="Modelo"
            value={modelo}
            variant="standard"
            onChange={(e) => setModelo(e.target.value)}
            helperText="Ej. A3"
          />
        </FormControl>

        <FormControl fullWidth>
        <TextField
            id="tipo_vehiculo"
            label="Tipo Vehículo"
            value={tipo_vehiculo}
            select
            variant="standard"
            //defaultValue="Sedan"
            onChange={(e) => setTipoVehiculo(e.target.value)}
            style={{ textAlign: 'left' }}
          >
            <MenuItem value={"Sedan"}>Sedan</MenuItem>
            <MenuItem value={"Hatchback"}>Hatchback</MenuItem>
            <MenuItem value={"SUV"}>SUV</MenuItem>
            <MenuItem value={"Pickup"}>Pickup</MenuItem>
            <MenuItem value={"Furgoneta"}>Furgoneta</MenuItem>
          </TextField>
        </FormControl>

        <FormControl fullWidth>
        <TextField
            id="tipo_motor"
            label="Tipo Motor"
            value={tipo_motor}
            select
            variant="standard"
            //defaultValue="Gasolina"
            onChange={(e) => setTipoMotor(e.target.value)}
            style={{ textAlign: 'left' }}
          >
            <MenuItem value={"Gasolina"}>Gasolina</MenuItem>
            <MenuItem value={"Diésel"}>Diésel</MenuItem>
            <MenuItem value={"Híbrido"}>Híbrido</MenuItem>
            <MenuItem value={"Eléctrico"}>Eléctrico</MenuItem>
        </TextField>
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="año"
            label="Año"
            type="number"
            value={año}
            variant="standard"
            onChange={(e) => setAño(e.target.value)}
            helperText="Ej. 2021"
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            id="km"
            label="Kilometraje"
            type="number"
            value={km}
            variant="standard"
            onChange={(e) => setKm(e.target.value)}
            helperText="Ej. 25000"
          />
        </FormControl>

        <FormControl>
          <br />
          <Button
            variant="contained"
            color="info"
            onClick={(e) => {
              updateVehiculo(e);
              //handLeClose();
          }}
            style={{ margin: "0.8rem" }}
            startIcon={<SaveIcon />}
          >
           ACTUALIZAR
          </Button>
        </FormControl>
      </form>
      <hr />
      <Link to="/vehiculo/list">Back to List</Link>
    </Box>
  );
};

export default AddEditVehiculo;
