import { swaggerSpecification } from "@/utils";
import { Router, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import usersRouter from "./users.routers";
import rolesRouter from "./role.routers";
import adminRouter from "./admin.routers";
import credentialRouter from "./credential.routers";
import applicationRouter from "./application.routers";
import organizationRouter from "./organization.routers";
import staffRouter from "./staff.routers";
import rootRouter from "./root.router";
import oid4vcRouter from "./oid4vc.router";
import { sendMetadata } from "@/controllers";

const router = Router();

router.use("/", rootRouter);
router.use("/users", usersRouter);
router.use("/admin", adminRouter);
router.use("/credentials", credentialRouter);
router.use("/applications", applicationRouter);
router.use("/organization", organizationRouter);
router.use("/staff", staffRouter);
router.use("/oid4vc", oid4vcRouter);
router.use("/roles", rolesRouter);
router.use("/docs", swaggerUi.serve);
router.use("/docs", swaggerUi.setup(swaggerSpecification));
router.route("/.well-known/openid-credential-issuer").get(sendMetadata);

export { router };
