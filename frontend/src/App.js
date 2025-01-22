import React, { useState, useEffect } from "react";
import UrlForm from "./components/UrlForm";
import UrlList from "./components/UrlList";
import { listUrls, checkUrl, checkAllUrls, updateUrl, deleteUrl } from "./api";

function App() {
  const [urls, setUrls] = useState([]);  // Stores the list of tracked URLs
  const [status, setStatus] = useState({}); // Stores the tracking status of each URL

  // Fetches the list of tracked URLs when the component loads
  useEffect(() => {
    loadUrls();
  }, []);

  // Function to load URLs from the backend
  const loadUrls = async () => {
    try {
        const response = await listUrls();  // Calls the API function
        console.log("Fetched URLs:", response.data);  // ✅ Debug output
        setUrls(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
        console.error("Error loading URLs", err);
        setUrls([]);  // Fallback to empty array
    }
  };

  // Function to check if a single URL has changed
  const handleCheck = async (url) => {
    try {
      const response = await checkUrl(url);
      setStatus((prev) => ({
        ...prev,
        [url]: response.data.doesPageMatch ? "Unchanged" : "Changed"
      }));
    } catch (err) {
      setStatus((prev) => ({ ...prev, [url]: "Error checking" }));
    }
  };

  // Function to check all tracked URLs
  const handleCheckAll = async () => {
    try {
        const response = await checkAllUrls();
        setStatus((prevStatus) => ({
            ...prevStatus,
            ...response.data
        }));
    } catch (err) {
        console.error("Failed to check all URLs", err);
    }
};

  // Function to update a tracked URL
  const handleUpdate = async (url) => {
    try {
      await updateUrl(url);
      setStatus((prev) => ({ ...prev, [url]: "Updated" }));
    } catch (err) {
      setStatus((prev) => ({ ...prev, [url]: "Update failed" }));
    }
  };

  // Function to delete a tracked URL
  const handleDelete = async (url) => {
    try {
      await deleteUrl(url);
      loadUrls(); // Refresh list after deletion
    } catch (err) {
      setStatus((prev) => ({ ...prev, [url]: "Delete failed" }));
    }
  };

  return (
    <div className="container">
      <h1>Webpage Tracker</h1>
      <UrlForm onAdd={loadUrls} />
      <button onClick={handleCheckAll}>Check All</button>
      <UrlList urls={urls} onCheck={handleCheck} onUpdate={handleUpdate} onDelete={handleDelete} status={status} />
    </div>
  );
}

export default App;