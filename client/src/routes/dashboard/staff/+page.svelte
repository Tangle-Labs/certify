<style lang="scss">
	.page-body {
		width: 100%;
		display: flex;

		.users-table {
			width: 65%;
			margin-right: 40px;
		}

		.sidebar {
			width: 35%;
			position: relative;

			.buttons {
				position: absolute;
				top: -85px;
				right: 0;
				display: flex;

				.button {
					&:first-of-type {
						margin-right: 20px;
					}
				}
			}
		}
	}

	.modal-body {
		padding: 20px 40px;

		.role {
			padding: 20px;
			border-top: 2px solid var(--alt-background);
			display: flex;
			justify-content: space-between;
			align-items: center;
			align-content: center;

			.role-header {
				font-size: 1.2rem;
				font-weight: 600;
			}

			&:first-of-type {
				padding: 20px 0;
				border-top: none;
			}
		}

		.buttons {
			margin-top: 30px;

			.button {
				&:last-of-type {
					margin-top: 10px;
				}
			}
		}
	}
</style>

<script lang="ts">
	import type { IRole, IUser } from "$lib/types";
	import { apiClient } from "$lib/utils";
	import { Button, Modal, Input, Switch } from "$lib/components/ui";
	import StaffTable from "./staff-components/StaffTable.svelte";
	import StaffCard from "./staff-components/StaffCard.svelte";

	let users: IUser[];
	let selected: IUser;
	let roles: IRole[];

	const loadRoles = async () => {
		const { data } = await apiClient.get("/roles");
		roles = data;
	};

	const getStaff = async () => {
		const { data } = await apiClient.get("/staff");
		users = data;
	};

	const handleSaveRole = async () => {
		await apiClient.post("/roles", { ...roleConfig });
		loadRoles();
	};

	let email: string;
	let roleId: string;
	let name: string;
	let showNewRoleModal = false;

	let roleConfig: IRole = {
		name: "",
		manageApplications: false,
		manageCredentials: false,
		manageOrganization: false,
		manageRoles: false,
		manageStaff: false
	};

	const setSelected = (user: IUser) => {
		selected = user;
		email = user.email;
		roleId = (user.Role && user.Role.id) ?? "";
		name = user.name;
	};

	const load = getStaff();
	const loadRoleData = loadRoles();
</script>

<div class="page-body">
	<Modal bind:isOpen={showNewRoleModal} header="Create New Role">
		<div class="modal-body">
			<div class="role">
				<Input
					label="Role Name"
					placeholder="Enter Role Name"
					bind:value={roleConfig.name}
				/>
			</div>
			<div class="role">
				<div class="role-header">Manage Applications</div>
				<Switch bind:value={roleConfig.manageApplications} />
			</div>
			<div class="role">
				<div class="role-header">Manage Credentials</div>
				<Switch bind:value={roleConfig.manageCredentials} />
			</div>
			<div class="role">
				<div class="role-header">Manage Organization</div>
				<Switch bind:value={roleConfig.manageOrganization} />
			</div>
			<div class="role">
				<div class="role-header">Manage Staff</div>
				<Switch bind:value={roleConfig.manageStaff} />
			</div>
			<div class="role">
				<div class="role-header">Manage Roles</div>
				<Switch bind:value={roleConfig.manageRoles} />
			</div>

			<div class="buttons">
				<div class="button">
					<Button label="Save Role" size="large" onClick={handleSaveRole} />
				</div>
				<div class="button">
					<Button
						label="Cancel"
						onClick={() => (showNewRoleModal = false)}
						variant="tertiary"
					/>
				</div>
			</div>
		</div>
	</Modal>
	<div class="users-table">
		<StaffTable {load} {users} {setSelected} />
	</div>
	<div class="sidebar">
		<div class="buttons">
			<div class="button">
				<Button
					label="+ New Role"
					size="large"
					onClick={() => (showNewRoleModal = true)}
					variant="tertiary"
				/>
			</div>
			<div class="button">
				<Button label="+ New Staff" size="large" onClick={() => null} />
			</div>
		</div>
		<StaffCard {selected} {email} {roleId} {name} {roles} load={loadRoleData} />
	</div>
</div>
