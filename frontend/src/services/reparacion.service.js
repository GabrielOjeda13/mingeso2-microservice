import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/v1/reparaciones/');
}

const create = data => {
    return httpClient.post("/api/v1/reparaciones/", data);
}

const get = id => {
    return httpClient.get(`/api/v1/reparaciones/${id}`);
}

const getList = patente => {
    return httpClient.get(`/api/v1/reparaciones/patente/${patente}`);
}

const getReporte = patente => {
    return httpClient.get(`/api/v1/reparaciones/reporter2/`);
}

const getReporteR4 = patente => {
    return httpClient.get(`/api/v1/reparaciones/reporter4/`);
}

const update = data => {
    return httpClient.put('/api/v1/reparaciones/', data);
}

const remove = id => {
    return httpClient.delete(`/api/v1/reparaciones/${id}`);
}
export default { getAll, create, get, getList, getReporte, getReporteR4, update, remove };