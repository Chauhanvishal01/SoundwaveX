import { Router } from "express";
import { callBack } from "../controllers/auth.controller.js";

const router = Router();
router.post("/cb", callBack);

export default router;
