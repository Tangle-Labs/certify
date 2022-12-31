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

<Table>
	<TableRow isHeader={true}>
		<TableHeader>User Name</TableHeader>
		<TableHeader>User Email</TableHeader>
		<TableHeader>Role</TableHeader>
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
		</TableRow>
	{:then data}
		{#each users as user, i (user.id)}
			<TableRow {i}>
				<TableData onClick={() => setSelected(user)}>{user.name}</TableData>
				<TableData onClick={() => setSelected(user)}>{user.email}</TableData>
				<TableData onClick={() => setSelected(user)}
					>{user.Role?.name ?? "None"}</TableData
				>
				<TableData onClick={() => setSelected(user)}>
					{new Date(user.createdAt).toDateString()}
				</TableData>
			</TableRow>
		{/each}
	{/await}
</Table>
