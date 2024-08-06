import httpClient from "../http-common";

const getReporte1 = () => {
    return httpClient.get('/api/v1/reporte/reporte1?mes=7&año=2024');
}

const getReporte2 = data => {
    return httpClient.get("/api/v1/reporte/2", data);
}

export default { getReporte1, getReporte2 };