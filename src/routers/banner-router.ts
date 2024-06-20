import express from "express";
import { getBanner } from "../../src/controllers/bannercontroller";

const router = express.Router();

router.get("/banner", getBanner);

export default router;
