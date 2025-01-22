import React from "react";

function UrlList({ urls, onCheck, onUpdate, onDelete, status }) {
    return (
        <ul>
            {urls.map((url) => {
                const fullUrl = url.startsWith("http") ? url : `https://${url}`;

                return (
                    <li key={url}>
                        <a href={fullUrl} target="_blank" rel="noreferrer" >
                            {url}
                        </a>
                        {" - "}
                        <span 
                            style={{ 
                                fontWeight: "bold", 
                                color: status[url] === undefined 
                                    ? "black"  // Unchecked
                                    : status[url] 
                                        ? "red"  // Unchanged
                                        : "green" // Changed
                            }}
                        >
                            {status[url] === undefined 
                                ? "Unchecked" 
                                : status[url] 
                                    ? "Unchanged" 
                                    : "Changed"}
                        </span>
                        <button onClick={() => onCheck(url)}>Check</button>
                        <button onClick={() => onUpdate(url)}>Update</button>
                        <button onClick={() => onDelete(url)}>Delete</button>
                    </li>
                );
            })}
        </ul>
    );
}

export default UrlList;