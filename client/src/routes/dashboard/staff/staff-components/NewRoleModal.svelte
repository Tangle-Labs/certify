<style lang="scss">
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
	import type { IRole } from "$lib/types";
	import { Modal, Button, Switch, Input } from "$lib/components/ui";

	export let showNewRoleModal: boolean;
	export let roleConfig: IRole;
	export let handleSaveRole: () => Promise<any>;
</script>

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
