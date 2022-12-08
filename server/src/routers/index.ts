import { swaggerSpecification } from "@/utils";
import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import usersRouter from "./users.routers";
import adminRouter from "./admin.routers";

const router = Router();

router.use("/users", usersRouter);
router.use("/admin", adminRouter);
router.use("/docs", swaggerUi.serve);
router.use("/docs", swaggerUi.setup(swaggerSpecification));

export { router };
