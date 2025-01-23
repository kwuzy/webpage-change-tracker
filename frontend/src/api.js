import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const handleApiError = (error, action) => {
    console.error(`Error during ${action}:`, error.response?.data || error.message);
    return { error: true, message: error.response?.data?.error || `Failed to ${action}. Please try again.` };
};

export const addUrl = async (url) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/add`, { url });
        return response;
    } catch (error) {
        handleApiError(error, "adding URL");
    }
};

export const listUrls = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/list`);
        return response;
    } catch (error) {
        handleApiError(error, "listing URLs");
    }
};

export const checkUrl = async (url) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/check`, { params: { url } });
        return response;
    } catch (error) {
        handleApiError(error, `checking URL: ${url}`);
    }
};

export const checkAllUrls = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/checkAll`);
        return response;
    } catch (error) {
        handleApiError(error, "checking all URLs");
    }
};

export const updateUrl = async (url) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/update`, { url });
        return response;
    } catch (error) {
        handleApiError(error, `updating URL: ${url}`);
    }
};

export const deleteUrl = async (url) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/delete`, {
            data: { url },
            headers: { "Content-Type": "application/json" }
        });
        return response;
    } catch (error) {
        handleApiError(error, `deleting URL: ${url}`);
    }
};