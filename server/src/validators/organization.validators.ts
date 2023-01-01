export const UpdateOrganizationDto = {
	fields: {
		owner: function () {
			return true;
		},
		orgName: function () {
			return true;
		},
		orgWebsite: function () {
			return true;
		},
		businessType: function () {
			return true;
		},
		orgDescription: function () {
			return true;
		}
	},
	mandatory: ["owner", "orgName", "orgWebsite", "businessType", "orgDescription"]
};
