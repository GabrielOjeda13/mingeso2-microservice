import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/v1/reparaciones/precio/');
}

const create = data => {
    return httpClient.post("/api/v1/reparaciones/precio/", data);
}

const get = id => {
    return httpClient.get(`/api/v1/reparaciones/precio/${id}`);
}

const getTipo = tipo => {
    return httpClient.get(`/api/v1/reparaciones/precio/tipo/${tipo}`);
}

const update = data => {
    return httpClient.put('/api/v1/reparaciones/precio/', data);
}

const remove = id => {
    return httpClient.delete(`/api/v1/reparaciones/precio/${id}`);
}
export default { getAll, create, get, getTipo, update, remove };