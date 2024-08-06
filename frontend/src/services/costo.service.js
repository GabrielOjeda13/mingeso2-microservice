import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/v1/orders/');
}

const create = data => {
    return httpClient.post("/api/v1/orders/", data);
}

const get = id => {
    return httpClient.get(`/api/v1/orders/${id}`);
}

const update = data => {
    return httpClient.put('/api/v1/orders/', data);
}

const remove = id => {
    return httpClient.delete(`/api/v1/orders/${id}`);
}
export default { getAll, create, get, update, remove };