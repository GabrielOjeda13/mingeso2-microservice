import httpClient from "../http-common";

const getReporte1 = (mes, año) => {
    return httpClient.get(`/api/v1/reporte/reporte1?mes=${mes}&año=${año}`);
}

const getReporte2 = (mes, año) => {
    return httpClient.get(`/api/v1/reporte/reporte2?mes=${mes}&año=${año}`);
}

export default { getReporte1, getReporte2 };
