import { getSiopRequestById, newSiopRequest } from "@/controllers";
import { Router } from "express";

const router = Router();

router.route("/siop").get(newSiopRequest);
router.route("/siop/:id").get(getSiopRequestById);

export default router;
