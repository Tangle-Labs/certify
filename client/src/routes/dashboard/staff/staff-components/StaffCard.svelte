<style lang="scss">
	.card-body {
		padding: 30px;

		.warn {
			padding-bottom: 20px;
			text-align: center;
		}

		.input-block {
			padding: 20px 0;
			border-bottom: 2px solid var(--alt-background);

			.header {
				font-size: 0.9rem;
				padding-bottom: 10px;
				color: var(--label-text);
			}

			.text {
				font-weight: 600;
			}

			&:last-of-type {
				border-bottom: none;
			}
		}
	}
</style>

<script lang="ts">
	import { CardWithHeader } from "$lib/components/project";
	import { Input, Skeleton } from "$lib/components/ui";
	import type { IRole, IUser } from "$lib/types";
	import { apiClient } from "$lib/utils";

	export let selected: IUser;

	export let email: string;
	export let roleId: string;
	export let roles: IRole[];
	export let name: string;
	export let load: Promise<any>;
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
					<div class="text">ACTIVE</div>
				</div>
			{/await}
		{:else}
			<div class="warn">Please select a user</div>
		{/if}
	</div>
</CardWithHeader>
