import { Router } from "express";
import rutainicio from "./ruta.inicio.js";
import rutahome from "./ruta.home.js";
var rutas = Router();
rutas.use("/", rutainicio);
rutas.use("/dash", rutahome);
export default rutas;