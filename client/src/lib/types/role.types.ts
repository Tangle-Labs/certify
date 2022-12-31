export interface IRole {
	id?: string;
	name: string;
	manageCredentials: boolean;
	manageOrganization: boolean;
	manageApplications: boolean;
	manageStaff: boolean;
	manageRoles: boolean;
}
