import { ModelService } from "./model.service";
import { Credential, Session, User } from "@/models";

export const UsersService = new ModelService(User);
export const CredentialsService = new ModelService(Credential);
export const SessionsService = new ModelService(Session);

export * from "./identity.service";
