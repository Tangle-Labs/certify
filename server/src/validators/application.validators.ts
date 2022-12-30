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
