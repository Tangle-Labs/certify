<script lang="ts">
	import { apiClient } from "$lib/utils";
	import {
		Table,
		TableRow,
		TableHeader,
		TableData,
		Skeleton
	} from "$lib/components/ui/";

	async function loadPage() {
		const { data } = await apiClient.get("/users");
		return data;
	}

	const applications = [
		{
			id: 0,
			name: "Big Dick NRG LLC",
			credential: "P0GG3R5",
			created: new Date(),
			type: "License",
			status: "Pending"
		},
		{
			id: 1,
			name: "Big Dick NRG LLC",
			credential: "P0GG3R5",
			created: new Date(),
			type: "License",
			status: "Pending"
		},
		{
			id: 2,
			name: "Big Dick NRG LLC",
			credential: "P0GG3R5",
			created: new Date(),
			type: "License",
			status: "Pending"
		},
		{
			id: 3,
			name: "Big Dick NRG LLC",
			credential: "P0GG3R5",
			created: new Date(),
			type: "License",
			status: "Pending"
		},
		{
			id: 4,
			name: "Big Dick NRG LLC",
			credential: "P0GG3R5",
			created: new Date(),
			type: "License",
			status: "Pending"
		}
	];

	const load = loadPage();
</script>

<Table>
	<TableRow isHeader={true}>
		<TableHeader>Business Name</TableHeader>
		<TableHeader>Credential</TableHeader>
		<TableHeader>Created</TableHeader>
		<TableHeader>Type</TableHeader>
		<TableHeader>Status</TableHeader>
	</TableRow>

	{#await load}
		<TableRow>
			<TableData><Skeleton /></TableData>
			<TableData><Skeleton /></TableData>
			<TableData><Skeleton /></TableData>
			<TableData><Skeleton /></TableData>
			<TableData><Skeleton /></TableData>
		</TableRow>
	{:then data}
		{#each applications as application, i (application.id)}
			<TableRow {i}>
				<TableData>{application.name}</TableData>
				<TableData>{application.credential}</TableData>
				<TableData>{application.created}</TableData>
				<TableData>{application.type}</TableData>
				<TableData>{application.status}</TableData>
			</TableRow>
		{/each}
	{/await}
</Table>
