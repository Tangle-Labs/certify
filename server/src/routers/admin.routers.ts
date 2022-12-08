import { setupOrganization } from "@/controllers";
import { Router } from "express";

const router = Router();

router.route("/setup").post(setupOrganization);

export default router;
