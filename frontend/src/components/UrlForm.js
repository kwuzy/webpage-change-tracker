import React, { useState } from "react";
import { addUrl } from "../api";

function UrlForm({ onAdd }) {
    const [url, setUrl] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!url) return;
        await addUrl(url);
        setUrl("");
        onAdd();
    };

return (
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter URL" value={url} onChange={(e) => setUrl(e.target.value)} />
        <button type="submit">Add URL</button>
    </form>
    );
}

export default UrlForm;