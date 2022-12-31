<script lang="ts">
	import { apiClient } from "$lib/utils";
	import {
		Table,
		TableRow,
		TableHeader,
		TableData,
		Skeleton
	} from "$lib/components/ui/";
	import type { IApplication } from "$lib/types";

	let applications: IApplication[];

	async function loadPage() {
		const { data } = await apiClient.get("/admin/applications");
		applications = data;
	}

	const load = loadPage();
</script>

<Table>
	<TableRow isHeader={true}>
		<TableHeader>Credential Name</TableHeader>
		<TableHeader>User's Name</TableHeader>
		<TableHeader>Created At</TableHeader>
		<TableHeader>Credential</TableHeader>
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
				<TableData>{application.Credential?.name}</TableData>
				<TableData>{application.User?.name}</TableData>
				<TableData>{application.createdAt}</TableData>
				<TableData>{application.Credential?.type}</TableData>
				<TableData>{application.status}</TableData>
			</TableRow>
		{/each}
	{/await}
</Table>
