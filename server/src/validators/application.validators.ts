/**
 * @openapi
 * components:
 *  schemas:
 *    CreateCredentialDto:
 *      type: object
 *      required:
 *        - body
 *        - credentialId
 *      properties:
 *        credentialId:
 *          type: string
 *        body:
 *          type: object
 *
 *    ModifyApplicationStatusDto:
 *      type: object
 *      required:
 *        - approve
 *      properties:
 *        approve:
 *          type: boolean
 *          default: true
 *
 *    ApplicationResponse:
 *      type: object
 *      required:
 *      properties:
 *        userId:
 *          type: string
 *        credentialId:
 *          type: string
 *        body:
 *          type: object
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

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
