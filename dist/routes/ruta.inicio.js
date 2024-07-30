import { Router } from "express";
import { ruta } from "../controllers/controller.inicio.js";
var rutainicio = Router();
rutainicio.get("/", ruta.login);
export default rutainicio;