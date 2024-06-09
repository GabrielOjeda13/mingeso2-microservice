import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/v1/vehiculo/');
}

const create = data => {
    return httpClient.post("/api/v1/vehiculo/", data);
}

const get = id => {
    return httpClient.get(`/api/v1/vehiculo/${id}`);
}

const getVehiculo = patente => {
    return httpClient.get(`/api/v1/vehiculo/patente/${patente}`);
}

const update = data => {
    return httpClient.put('/api/v1/vehiculo/', data);
}

const remove = id => {
    return httpClient.delete(`/api/v1/vehiculo/${id}`);
}
export default { getAll, create, get, getVehiculo, update, remove };