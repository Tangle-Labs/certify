<style lang="scss">
	.modal-body {
		padding: 20px 40px;

		.input-block {
			padding: 20px 0;
			border-top: 2px solid var(--alt-background);
			display: flex;
			justify-content: space-between;
			align-items: center;
			align-content: center;

			&:first-of-type {
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
	import { Modal, Button, Input } from "$lib/components/ui";
	import type { IRole } from "$lib/types";

	export let showNewStaffModal: boolean;
	export let user: {
		name: string;
		email: string;
		password: string;
		roleId: string;
	};
	export let roles: IRole[];
	export let handleSaveStaff: () => Promise<any>;
</script>

<Modal bind:isOpen={showNewStaffModal} header="Create New Staff">
	<div class="modal-body">
		<div class="input-block">
			<Input
				label="User Name"
				placeholder="Enter User Name"
				bind:value={user.name}
			/>
		</div>

		<div class="input-block">
			<Input
				label="User Email"
				placeholder="Enter User Email"
				variant="email"
				bind:value={user.email}
			/>
		</div>

		<div class="input-block">
			<Input
				label="User Password"
				placeholder="Enter User Password"
				variant="password"
				bind:value={user.password}
			/>
		</div>

		<div class="input-block">
			<Input label="Select Role" bind:value={user.roleId} variant="dropdown">
				<option value="none" disabled={true}>Select a role</option>
				{#each roles as role (role.id)}
					<option value={role.id}>{role.name}</option>
				{/each}
			</Input>
		</div>

		<div class="buttons">
			<div class="button">
				<Button label="Save Staff" size="large" onClick={handleSaveStaff} />
			</div>
			<div class="button">
				<Button
					label="Cancel"
					onClick={() => (showNewStaffModal = false)}
					variant="tertiary"
				/>
			</div>
		</div>
	</div>
</Modal>
