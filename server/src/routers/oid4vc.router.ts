import { getSiopRequestById, newSiopRequest, verifyAuthResponse } from "@/controllers";
import { Router } from "express";

const router = Router();

router.route("/siop").get(newSiopRequest);
router.route("/siop/:id").get(getSiopRequestById);
router.route("/auth").post(verifyAuthResponse);

export default router;
