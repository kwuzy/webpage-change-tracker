import React from "react";

function UrlList({ urls, onCheck, onUpdate, onDelete, status }) {
    return (
        <ul>
            {urls.map((url) => (
                <li key={url}>
                    {url} - {status[url] !== undefined ? (status[url] ? "Unchanged" : "Changed") : "Unchecked"}
                    <button onClick={() => onCheck(url)}>Check</button>
                    <button onClick={() => onUpdate(url)}>Update</button>
                    <button onClick={() => onDelete(url)}>Delete</button>
                </li>
            ))}
        </ul>
    );
}

export default UrlList;