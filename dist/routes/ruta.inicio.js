import { Router } from "express";
import { ruta } from "../controllers/controller.inicio.js";

const rutainicio = Router();

rutainicio.get("/", ruta.login);

export default rutainicio;