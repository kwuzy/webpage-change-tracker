import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const addUrl = (url) => axios.post(`${API_BASE_URL}/add`, { url });

export const listUrls = () => axios.get(`${API_BASE_URL}/list`);

export const checkUrl = (url) => axios.get(`${API_BASE_URL}/check`, { params: { url } });

export const checkAllUrls = () => axios.get(`${API_BASE_URL}/checkAll`);

export const updateUrl = (url) => axios.put(`${API_BASE_URL}/update`, { url });

export const deleteUrl = (url) => axios.delete(`${API_BASE_URL}/delete`, {
    data: { url },
    headers: { "Content-Type": "application/json" }
});