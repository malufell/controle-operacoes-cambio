const express = require("express");
const app = express();
const port = 3000;
const router = require('./routes');
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(router);

app.listen(port, () => console.log(`servidor rodando na porta ${port}`));
