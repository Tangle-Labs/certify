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
</style>

<script lang="ts">
	import type { IRole, IUser } from "$lib/types";
	import { apiClient } from "$lib/utils";
	import { Button } from "$lib/components/ui";
	import { ConfirmActionModal } from "$lib/components/project";
	import StaffTable from "./staff-components/StaffTable.svelte";
	import StaffCard from "./staff-components/StaffCard.svelte";
	import NewRoleModal from "./staff-components/NewRoleModal.svelte";
	import NewStaffModal from "./staff-components/NewStaffModal.svelte";

	let users: IUser[];
	let selected: IUser;
	let roles: IRole[];
	let user = {
		name: "",
		password: "",
		email: "",
		roleId: "none"
	};
	let showRemoveUserConfirmation: boolean;

	const handleRemoveUser = async () => {
		await apiClient.delete(`/staff/${selected.id}`);
		const users = await getStaff();
		selected = users.find((u: IUser) => u.id === selected.id) ?? selected;
		showRemoveUserConfirmation = false;
	};

	const loadRoles = async () => {
		const { data } = await apiClient.get("/roles");
		roles = data;
	};

	const getStaff = async () => {
		const { data } = await apiClient.get("/staff");
		users = data;
		return users;
	};

	const handleSaveRole = async () => {
		await apiClient.post("/roles", { ...roleConfig });
		loadRoles();
		showNewRoleModal = false;
	};

	const handleSaveStaff = async () => {
		await apiClient.post("/staff", { ...user });
		getStaff();
		showNewStaffModal = false;
	};

	let email: string;
	let roleId: string;
	let name: string;
	let showNewRoleModal = false;
	let showNewStaffModal = false;

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
	<NewRoleModal bind:showNewRoleModal bind:roleConfig {handleSaveRole} />
	<NewStaffModal bind:showNewStaffModal bind:user {handleSaveStaff} {roles} />
	<ConfirmActionModal
		bind:showConfirmation={showRemoveUserConfirmation}
		confirmationPrompt="Remove User"
		confirmAction={handleRemoveUser}
	/>
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
				<Button
					label="+ New Staff"
					size="large"
					onClick={() => (showNewStaffModal = true)}
				/>
			</div>
		</div>
		<StaffCard
			bind:selected
			{email}
			{roleId}
			{name}
			{roles}
			bind:showRemoveUserConfirmation
			load={loadRoleData}
			loadMethod={getStaff}
		/>
	</div>
</div>
