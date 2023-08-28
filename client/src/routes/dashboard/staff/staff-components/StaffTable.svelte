<style lang="scss">
	.active,
	.inactive {
		color: var(--secondary);
		font-weight: 600;
	}

	.inactive {
		color: var(--error-text);
	}
</style>

<script lang="ts">
	import {
		Table,
		TableData,
		TableHeader,
		TableRow,
		Skeleton
	} from "$lib/components/ui";
	import type { IUser } from "$lib/types";

	export let users: IUser[];
	export let setSelected: (user: IUser) => void;
	export let load: Promise<any>;
</script>

<Table pageTable>
	<TableRow isHeader={true}>
		<TableHeader>User Name</TableHeader>
		<TableHeader>User Email</TableHeader>
		<TableHeader>Role</TableHeader>
		<TableHeader>Status</TableHeader>
		<TableHeader>Created On</TableHeader>
	</TableRow>

	{#await load}
		<TableRow>
			<TableData>
				<Skeleton />
			</TableData>
			<TableData>
				<Skeleton />
			</TableData>
			<TableData>
				<Skeleton />
			</TableData>
			<TableData>
				<Skeleton />
			</TableData>
			<TableData>
				<Skeleton />
			</TableData>
		</TableRow>
	{:then data}
		{#each users as user, i (user.id)}
			<TableRow {i}>
				<TableData onClick={() => setSelected(user)}>{user.name}</TableData>
				<TableData onClick={() => setSelected(user)}>{user.email}</TableData>
				<TableData onClick={() => setSelected(user)}
					>{user.Role?.name ?? "None"}</TableData>
				<TableData onClick={() => setSelected(user)}>
					<div class:active={user.isActive} class:inactive={!user.isActive}>
						{user.isActive ? "ACTIVE" : "REMOVED"}
					</div>
				</TableData>
				<TableData onClick={() => setSelected(user)}>
					{new Date(user.createdAt).toDateString()}
				</TableData>
			</TableRow>
		{/each}
	{/await}
</Table>
