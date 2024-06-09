import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import vehiculoService from "../services/vehiculo.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ButtonMui from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";

const AddVehiculo = ({show, handLeClose}) => {
  const [patente, setPatente] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [tipo_vehiculo, setTipoVehiculo] = useState("");
  const [tipo_motor, setTipoMotor] = useState("");
  const [año, setAño] = useState("");
  const [km, setKm] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  

  const saveVehiculo = (e) => {
    e.preventDefault();

    const vehiculo = { patente, marca, modelo, tipo_vehiculo, tipo_motor, año, km, id };
      //Crear nuevo vehiculo
      vehiculoService
        .create(vehiculo)
        .then((response) => {
          console.log("Vehículo ha sido añadido.", response.data);
          navigate("/vehiculo/list");
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar crear nuevo Vehículo.",
            error
          );
        });
  };


  return (
    <Modal show={show} onHide={handLeClose}>
        <Modal.Header closeButton>
            <Modal.Title>Nuevo Vehículo</Modal.Title>
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
            <form>
                <FormControl fullWidth>
                <TextField
                    id="patente"
                    label="Patente"
                    value={patente}
                    variant="standard"
                    onChange={(e) => setPatente(e.target.value)}
                    helperText="Ej. AABB69"
                    style={{margin:"8px"}}
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
                    style={{margin:"8px"}}
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
                    style={{margin:"8px"}}
                />
                </FormControl>

                <FormControl fullWidth>
                <TextField
                    id="tipoVehiculo"
                    label="Tipo Vehículo"
                    value={tipo_vehiculo}
                    select
                    variant="standard"
                    defaultValue="Sedan"
                    onChange={(e) => setTipoVehiculo(e.target.value)}
                    style={{margin:"8px"}}
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
                    id="tipoMotor"
                    label="Tipo Motor"
                    value={tipo_motor}
                    select
                    variant="standard"
                    defaultValue="Gasolina"
                    onChange={(e) => setTipoMotor(e.target.value)}
                    style={{margin:"8px"}}
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
                    style={{margin:"8px"}}
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
                    style={{margin:"8px"}}
                />
                </FormControl>

                <FormControl>
                <br />
                </FormControl>
            </form>
            <hr />
            </Box>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secundary" onClick={handLeClose}>Cancelar</Button>
            <Button
                variant="primary"
                color="info"
                onClick={(e) => {
                    saveVehiculo(e);
                    handLeClose();
                    window.confirm("\u2714 ¡El vehículo se creó correctamente!");
                    window.location.reload();
                }}
                    style={{ margin: "10px 10px 10px 10px", padding: "10px 10px 10px 10px"}}>Registrar</Button>
        </Modal.Footer>
    </Modal>
  );
};

export default AddVehiculo;
