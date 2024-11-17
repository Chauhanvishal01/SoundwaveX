import { Router } from "express";
import { getAlbum, getAllAlbum } from "../controllers/album.controller.js";

const router = Router();

router.get("/", getAllAlbum);
router.get("/:albumId", getAlbum);

export default router;
