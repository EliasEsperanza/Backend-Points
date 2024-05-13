import { Router } from "express";
import { login } from "./login.js";

const router = Router();
router.post('/login', login);

export default router;