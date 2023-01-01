<style lang="scss">
	.body {
		padding: 20px 0;
		width: 100%;
		display: flex;

		.roles {
			width: 35%;
			flex-wrap: wrap;

			.role-block {
				width: 100%;
				display: flex;
				flex-basis: 100%;
				padding: 10px;
				background: var(--background);
				color: var(--header-text);
				border: none;
				border-bottom: 2px solid var(--alt-background);
				align-items: center;
				align-content: center;
				transition: 0.4s all;

				.role-thumbnail {
					background: var(--alt-background);
					font-size: 1.75rem;
					padding: 20px;
					width: 35px;
					height: 35px;
					position: relative;
					border-radius: 10px;

					.thumb {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
					}
				}

				.text {
					margin: 0;
					margin-left: 25px;
					font-size: 1.2rem;
					font-weight: 600;
					padding: 0;
				}

				&.is-selected {
					background: var(--table-header);
				}

				&:hover {
					background: var(--table-header-hover);
					cursor: pointer;
				}
			}
		}

		.selected-role {
			margin-left: 40px;
			width: 65%;

			.card-body {
				padding: 40px;

				.role {
					padding: 20px;
					display: flex;
					justify-content: space-between;
					border-top: 2px solid var(--alt-background);

					.role-header {
						font-size: 1.15rem;
					}

					&:first-of-type {
						border-top: none;
						padding: 20px 0;
					}
				}

				.buttons {
					padding: 20px 0;

					.button {
						padding: 5px;
					}
				}
			}
		}
	}
</style>

<script lang="ts">
	import { apiClient } from "$lib/utils";
	import { Skeleton, Input, Switch, Button } from "$lib/components/ui";
	import { CardWithHeader } from "$lib/components/project";
	import type { IRole } from "$lib/types";

	let roles: IRole[];
	let selected: IRole | null = null;

	const getRoles = async () => {
		const { data } = await apiClient.get("/roles");
		roles = data;
	};

	const handleSaveRole = async () => {
		if (!selected) return;
		const data = await apiClient.patch(`/roles/${selected.id}`, {
			...selected
		});
		getRoles();
	};

	const load = getRoles();
</script>

<h2>User Roles</h2>
<div class="body">
	<div class="roles">
		{#await load}
			<div class="role-block">
				<div class="role-thumbnail" />
				<div class="text">
					<Skeleton />
				</div>
			</div>
		{:then}
			{#each roles as role (role.id)}
				<button
					class="role-block"
					on:click={() => (selected = role)}
					class:is-selected={selected && selected.id === role.id}
				>
					<div class="role-thumbnail">
						<div class="thumb">
							{role.name[0].toUpperCase()}
						</div>
					</div>
					<div class="text">
						{role.name}
					</div>
				</button>
			{/each}
		{/await}
	</div>

	<div class="selected-role">
		{#await load then}
			{#if selected}
				<CardWithHeader header={selected.name}>
					<div class="card-body">
						<div class="role">
							<Input
								label="Role Name"
								placeholder="Enter Role Name"
								bind:value={selected.name}
							/>
						</div>
						<div class="role">
							<div class="role-header">Manage Applications</div>
							<Switch bind:value={selected.manageApplications} />
						</div>
						<div class="role">
							<div class="role-header">Manage Credentials</div>
							<Switch bind:value={selected.manageCredentials} />
						</div>
						<div class="role">
							<div class="role-header">Manage Organization</div>
							<Switch bind:value={selected.manageOrganization} />
						</div>
						<div class="role">
							<div class="role-header">Manage Staff</div>
							<Switch bind:value={selected.manageStaff} />
						</div>
						<div class="role">
							<div class="role-header">Manage Roles</div>
							<Switch bind:value={selected.manageRoles} />
						</div>

						<div class="buttons">
							<div class="button">
								<Button
									label="Save Role"
									size="large"
									onClick={handleSaveRole}
								/>
							</div>
							<div class="button">
								<Button
									label="Cancel"
									onClick={() => (selected = null)}
									variant="tertiary"
								/>
							</div>
						</div>
					</div>
				</CardWithHeader>
			{/if}
		{/await}
	</div>
</div>
