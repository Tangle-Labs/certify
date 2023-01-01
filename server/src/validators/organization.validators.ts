/**
 * @openapi
 * components:
 *  schemas:
 *    UpdateOrganizationDto:
 *      type: object
 *      required:
 *        - name
 *        - manageCredentials
 *        - manageOrganization
 *        - manageApplications
 *        - manageStaff
 *        - manageRoles
 *      properties:
 *        owner:
 *          type: string
 *        orgName:
 *          type: string
 *          default: Certify Admin
 *        orgWebsite:
 *          type: string
 *          default: https://test.com
 *        businessType:
 *          type: string
 *          default: Technology
 *        orgDescription:
 *          type: string
 *          default: lorem ipsum dolor sit amet
 *
 *    OrganizationResponse:
 *      type: object
 *      required:
 *      properties:
 *        owner:
 *          type: string
 *        orgName:
 *          type: string
 *        orgWebsite:
 *          type: string
 *        businessType:
 *          type: string
 *        orgDescription:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

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
