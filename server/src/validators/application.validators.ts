export const CreateApplicationDto = {
	fields: {
		credentialId: function (id: string) {
			return id;
		},
		body: function (body: Record<string, any>) {
			return body;
		}
	},
	mandatory: ["credentialId", "body"]
};

export const ModifyAdminApplicationDto = {
	fields: {
		approve: function (approve: boolean) {
			return [true, false].includes(approve);
		}
	},
	mandatory: ["approve"]
};
