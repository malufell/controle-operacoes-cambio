const express = require("express");
const app = express();
const router = require('./routes');
const path = require("path");
const methodOverride = require("method-override");
const port = process.env.PORT || 3000;

app.use(express.urlencoded({
    extended: true
}));

app.use(methodOverride('_method'))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(router);

app.listen(port, () => console.log(`servidor rodando na porta ${port}`));
