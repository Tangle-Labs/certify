import {
	getCredOffer,
	createCredentialOffer,
	getSiopRequestById,
	newSiopRequest,
	tokenEndpoint,
	verifyAuthResponse,
	sendCredential
} from "@/controllers";
import { Router } from "express";

const router = Router();

router.route("/siop").get(newSiopRequest);
router.route("/siop/:id").get(getSiopRequestById);
router.route("/token").post(tokenEndpoint);
router.route("/credentials/:id").get(createCredentialOffer);
router.route("/credential").post(sendCredential);
router.route("/offers/:id").get(getCredOffer);
router.route("/auth").post(verifyAuthResponse);

export default router;
