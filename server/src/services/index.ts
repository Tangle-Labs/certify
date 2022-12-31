import { ModelService } from "./models/model.service";
import { Application, Credential, Role, Session, User } from "@/models";

export const UsersService = new ModelService(User);
export const CredentialsService = new ModelService(Credential);
export const SessionsService = new ModelService(Session);
export const ApplicationsService = new ModelService(Application);
export const RolesService = new ModelService(Role);

export * from "./identity.service";
