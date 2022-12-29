import { swaggerSpecification } from "@/utils";
import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import usersRouter from "./users.routers";
import adminRouter from "./admin.routers";
import credentialRouter from "./credential.routers";

const router = Router();

router.use("/users", usersRouter);
router.use("/admin", adminRouter);
router.use("/credentials", credentialRouter);
router.use("/docs", swaggerUi.serve);
router.use("/docs", swaggerUi.setup(swaggerSpecification));

export { router };
