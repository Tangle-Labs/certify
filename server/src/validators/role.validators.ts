export const CreateRoleDto = {
	fields: {
		name: function (n: string) {
			return n;
		},
		manageCredentials: function (p: boolean) {
			return [true, false].includes(p);
		},
		manageOrganization: function (p: boolean) {
			return [true, false].includes(p);
		},
		manageApplications: function (p: boolean) {
			return [true, false].includes(p);
		},
		manageStaff: function (p: boolean) {
			return [true, false].includes(p);
		},
		manageRoles: function (p: boolean) {
			return [true, false].includes(p);
		}
	},
	mandatory: [
		"name",
		"manageCredentials",
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
			return [true, false].includes(p);
		},
		manageOrganization: function (p: boolean) {
			return [true, false].includes(p);
		},
		manageApplications: function (p: boolean) {
			return [true, false].includes(p);
		},
		manageStaff: function (p: boolean) {
			return [true, false].includes(p);
		},
		manageRoles: function (p: boolean) {
			return [true, false].includes(p);
		}
	},
	mandatory: []
};
