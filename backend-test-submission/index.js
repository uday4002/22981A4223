const express = require("express");
const dotenv = require("dotenv");
const { nanoid } = require("nanoid");
const cors = require("cors");
const logger = require("../logging-middleware/logger");

dotenv.config();
const app = express();
const PORT = 3001;


const urlDatabase = {};

app.use(express.json());
app.use(cors())
app.use(logger("middleware"));

app.post("/shorten", logger("route", "info"), (req, res) => {
    const { originalUrl } = req.body;

    if (!originalUrl || typeof originalUrl !== "string") {
        return res.status(400).json({ error: "originalUrl is required." });
    }

    const shortId = nanoid(6);
    const shortUrl = `http://localhost:${PORT}/${shortId}`;
    urlDatabase[shortId] = originalUrl;

    res.json({ shortUrl });
});


app.get("/:shortId", logger("route", "info"), (req, res) => {
    const originalUrl = urlDatabase[req.params.shortId];
    if (originalUrl) {
        return res.redirect(originalUrl);
    } else {
        return res.status(404).json({ error: "Short URL not found." });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
