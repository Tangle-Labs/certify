<style lang="scss">
	.status {
		color: var(--primary);
		font-weight: 600;

		&.approved {
			color: var(--secondary);
		}

		&.rejected {
			color: var(--error-text);
		}
	}
</style>

<script lang="ts">
	import { apiClient } from "$lib/utils";
	import {
		Table,
		TableRow,
		TableHeader,
		TableData,
		Skeleton,
		Button
	} from "$lib/components/ui/";
	import type { IApplication } from "$lib/types";

	export let applications: IApplication[];
	export let selected: IApplication;
	export let load: Promise<any>;
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
				<TableData onClick={() => (selected = application)}
					>{application.Credential?.name}</TableData
				>
				<TableData onClick={() => (selected = application)}
					>{application.User?.name}</TableData
				>
				<TableData onClick={() => (selected = application)}
					>{new Date(application.createdAt).toDateString()}</TableData
				>
				<TableData onClick={() => (selected = application)}
					>{application.Credential?.type}</TableData
				>
				<TableData onClick={() => (selected = application)}>
					<div
						class="status"
						class:approved={application.status === "approved"}
						class:rejected={application.status === "rejected"}
					>
						{application.status.toUpperCase()}
					</div>
				</TableData>
			</TableRow>
		{/each}
	{/await}
</Table>
