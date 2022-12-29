<style>
	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
	}
</style>

<script lang="ts">
	import { axios } from "$lib/utils/axios.utils";
	import { Table, TableRow, TableHeader, TableData } from "$lib/components/ui/";

	async function loadPage() {
		const { data } = await axios.get("/users");
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

{#await load}
	<div class="loading">
		<h1>Loading...</h1>
	</div>
{:then data}
	<Table>
		<TableRow isHeader={true}>
			<TableHeader>Business Name</TableHeader>
			<TableHeader>Credential</TableHeader>
			<TableHeader>Created</TableHeader>
			<TableHeader>Type</TableHeader>
			<TableHeader>Status</TableHeader>
		</TableRow>
		{#each applications as application, i (application.id)}
			<TableRow {i}>
				<TableData>{application.name}</TableData>
				<TableData>{application.credential}</TableData>
				<TableData>{application.created}</TableData>
				<TableData>{application.type}</TableData>
				<TableData>{application.status}</TableData>
			</TableRow>
		{/each}
	</Table>
{/await}
