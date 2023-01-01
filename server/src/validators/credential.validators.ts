/**
 * @openapi
 * components:
 *  schemas:
 *    CreateCredentialDto:
 *      type: object
 *      required:
 *        - name
 *        - referenceCode
 *        - type
 *        - duration
 *        - customFields
 *      properties:
 *        name:
 *          type: string
 *          default: Credential
 *        referenceCode:
 *          type: string
 *          default: CR3D
 *        type:
 *          type: string
 *          default: license
 *        duration:
 *          type: number
 *          default: 86400
 *        customFields:
 *          type: object
 *
 *    CredentialResponse:
 *      type: object
 *      required:
 *      properties:
 *        name:
 *          type: string
 *        referenceCode:
 *          type: string
 *        type:
 *          type: string
 *        duration:
 *          type: number
 *        customFields:
 *          type: object
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

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
