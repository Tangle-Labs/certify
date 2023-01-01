import { getInfo } from "@/controllers";
import { Router } from "express";

const router = Router();

router.route("/info").get(getInfo);

export default router;
