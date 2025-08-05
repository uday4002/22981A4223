import React, { useState } from "react";
import "./App.css";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleShorten = async () => {
    setShortUrl("");
    setError("");

    if (!originalUrl) {
      setError("Please enter a URL.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ originalUrl })
      });

      const data = await response.json();

      if (response.ok) {
        setShortUrl(data.shortUrl);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Network error or backend not running.");
    }
  };

  return (
    <div className="container">
      <h1 className="heading">URL Shortener</h1>

      <input
        type="text"
        placeholder="Enter long URL"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        className="input"
      />

      <button onClick={handleShorten} className="button">
        Shorten
      </button>

      {shortUrl && (
        <div className="result">
          Short URL:{" "}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}

      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;
