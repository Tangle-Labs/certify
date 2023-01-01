/**
 * @openapi
 * components:
 *  schemas:
 *    CreateRoleDto:
 *      type: object
 *      required:
 *        - name
 *        - manageCredentials
 *        - manageOrganization
 *        - manageApplications
 *        - manageStaff
 *        - manageRoles
 *      properties:
 *        name:
 *          type: string
 *          default: Admin Role
 *        manageOrganization:
 *          type: boolean
 *          default: true
 *        manageCredentials:
 *          type: boolean
 *          default: true
 *        manageApplications:
 *          type: boolean
 *          default: true
 *        manageStaff:
 *          type: boolean
 *          default: true
 *        manageRoles:
 *          type: boolean
 *          default: true
 *
 *    UpdateRoleDto:
 *      type: object
 *      required:
 *      properties:
 *        name:
 *          type: string
 *          default: Admin Role
 *        manageOrganization:
 *          type: boolean
 *          default: true
 *        manageCredentials:
 *          type: boolean
 *          default: true
 *        manageApplications:
 *          type: boolean
 *          default: true
 *        manageStaff:
 *          type: boolean
 *          default: true
 *        manageRoles:
 *          type: boolean
 *          default: true
 *
 *    RoleResponse:
 *      type: object
 *      required:
 *      properties:
 *        name:
 *          type: string
 *        manageOrganization:
 *          type: boolean
 *        manageCredentials:
 *          type: boolean
 *        manageApplications:
 *          type: boolean
 *        manageStaff:
 *          type: boolean
 *        manageRoles:
 *          type: boolean
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

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
