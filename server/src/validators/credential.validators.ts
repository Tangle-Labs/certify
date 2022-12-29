export const CreateCredentialDto = {
	fields: {
		name: function (name: string) {
			return name;
		},
		referenceCode: function (referenceCode: string) {
			return referenceCode;
		},
		type: function (type: string) {
			return type;
		},
		duration: function (duration: string) {
			return duration;
		},
		customFields: function (customFields: string) {
			return customFields;
		}
	},
	mandatory: ["name", "referenceCode", "type", "duration", "customFields"]
};
