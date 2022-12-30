import { ModelService } from "./model.service";
import { Application, Credential, Session, User } from "@/models";

export const UsersService = new ModelService(User);
export const CredentialsService = new ModelService(Credential);
export const SessionsService = new ModelService(Session);
export const ApplicationsService = new ModelService(Application);

export * from "./identity.service";
