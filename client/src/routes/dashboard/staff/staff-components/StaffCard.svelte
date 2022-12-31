<style lang="scss">
	.card-body {
		padding: 30px;

		.warn {
			padding-bottom: 20px;
			text-align: center;
		}

		.input-block {
			padding: 20px 0;
			border-top: 2px solid var(--alt-background);

			.header {
				font-size: 0.9rem;
				padding-bottom: 10px;
				color: var(--label-text);
			}

			.text {
				font-weight: 600;
			}

			.active {
				color: var(--secondary);
			}

			.inactive {
				color: var(--error-text);
			}

			&:first-of-type {
				border-top: none;
			}
		}
	}
</style>

<script lang="ts">
	import { CardWithHeader } from "$lib/components/project";
	import { Input, Skeleton, Button } from "$lib/components/ui";
	import type { IRole, IUser } from "$lib/types";
	import { apiClient } from "$lib/utils";

	export let selected: IUser;

	export let email: string;
	export let roleId: string;
	export let roles: IRole[];
	export let name: string;
	export let load: Promise<any>;
	export let loadMethod: () => Promise<any>;

	const handleUserUpdate = async () => {
		await apiClient.patch(`/staff/${selected.id}`, { email, roleId, name });
		const users = await loadMethod();
		selected = users.find((u: IUser) => u.id === selected.id);
	};

	const handleRemoveUser = async () => {
		await apiClient.delete(`/staff/${selected.id}`);
		const users = await loadMethod();
		selected = users.find((u: IUser) => u.id === selected.id);
	};
</script>

<CardWithHeader header="Preview Staff">
	<div class="card-body">
		{#if selected}
			{#await load}
				<Skeleton />
			{:then}
				<div class="input-block">
					<div class="header">User Name</div>
					<Input bind:value={name} placeholder="Enter User's Name" />
				</div>

				<div class="input-block">
					<div class="header">User Email</div>
					<Input bind:value={email} placeholder="Enter E-Mail Address" />
				</div>

				<div class="input-block">
					<div class="header">User Role</div>
					<Input bind:value={roleId} variant="dropdown">
						<option value={""} disabled={true}>No Role Selected</option>
						{#each roles as role (role.id)}
							<option value={role.id}>{role.name}</option>
						{/each}
					</Input>
				</div>

				<div class="input-block">
					<div class="header">Created At</div>
					<div class="text">
						{new Date(selected.createdAt).toDateString()}
					</div>
				</div>

				<div class="input-block">
					<div class="header">User Status</div>
					<div
						class="text"
						class:active={selected.isActive}
						class:inactive={!selected.isActive}
					>
						{selected.isActive ? "ACTIVE" : "INACTIVE"}
					</div>
				</div>

				<div class="buttons">
					<div class="button">
						<Button label="Save User" onClick={handleUserUpdate} />
					</div>
					<div class="button">
						<Button
							label="Remove User"
							variant="tertiary"
							onClick={handleRemoveUser}
						/>
					</div>
				</div>
			{/await}
		{:else}
			<div class="warn">Please select a user</div>
		{/if}
	</div>
</CardWithHeader>
