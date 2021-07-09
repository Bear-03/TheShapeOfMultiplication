const express = require("express");
const compression = require("compression");
const path = require("path");

const app = express();

// Gzip
app.use(compression());

app.use(express.static(path.resolve(__dirname, "../build")));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
