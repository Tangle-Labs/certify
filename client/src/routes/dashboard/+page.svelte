<script lang="ts">
	import { apiClient } from "$lib/utils";
	import {
		Table,
		TableRow,
		TableHeader,
		TableData,
		Skeleton
	} from "$lib/components/ui/";

	let applications: Record<string, any>;

	async function loadPage() {
		const { data } = await apiClient.get("/admin/applications");
		applications = data;
	}

	

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
