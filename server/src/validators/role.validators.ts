export const CreateRoleDto = {
	fields: {
		name: function (n: string) {
			return n;
		},
		manageCredentials: function (p: boolean) {
			return typeof p == "boolean";
		},
		manageOrganization: function (p: boolean) {
			return typeof p == "boolean";
		},
		manageApplications: function (p: boolean) {
			return typeof p == "boolean";
		},
		manageStaff: function (p: boolean) {
			return typeof p == "boolean";
		},
		manageRoles: function (p: boolean) {
			return typeof p == "boolean";
		}
	},
	mandatory: [
		"name",
		"manageCredentials",
		"manageOrganization",
		"manageOrganization",
		"manageApplications",
		"manageStaff",
		"manageRoles"
	]
};

export const UpdateRoteDto = {
	fields: {
		name: function (n: string) {
			return n;
		},
		manageCredentials: function (p: boolean) {
			return typeof p == "boolean";
		},
		manageOrganization: function (p: boolean) {
			return typeof p == "boolean";
		},
		manageApplications: function (p: boolean) {
			return typeof p == "boolean";
		},
		manageStaff: function (p: boolean) {
			return typeof p == "boolean";
		},
		manageRoles: function (p: boolean) {
			return typeof p == "boolean";
		}
	},
	mandatory: []
};
