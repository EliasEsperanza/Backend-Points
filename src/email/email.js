import { Router } from "express";
import { enviarMensaje } from "./envioMensajes.js";

const router = Router();

router.post("/send", enviarMensaje);

export default router;