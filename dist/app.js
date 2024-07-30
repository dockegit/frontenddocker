import express from 'express';
import { config } from 'dotenv';
import rutas from './routes/index.js';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
config();
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
// plantillas

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// puerto
app.set("port", process.env.PORT || 3000);
app.use(express["static"](path.join(__dirname, "public")));

// rutas
app.use("/", rutas);

// error
app.use("/", function (req, res) {
  res.render("view.error.ejs");
});
export default app;