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
	import {
		Table,
		TableData,
		TableHeader,
		TableRow,
		Skeleton
	} from "$lib/components/ui";
	import type { IApplication, ICredential } from "$lib/types";

	export let credentials: ICredential[] = [];
	export let applications: IApplication[] = [];
	export let selectedCred: ICredential | null = null;
	export let selectedApplication: IApplication | null = null;
	export let variant: "admin" | "user";
	export let load: Promise<any>;
</script>

<Table>
	<TableRow isHeader={true}>
		{#if variant === "admin"}
			<TableHeader>Credential Name</TableHeader>
			<TableHeader>Reference Code</TableHeader>
			<TableHeader>Credential Type</TableHeader>
			<TableHeader>Created On</TableHeader>
		{:else}
			<TableHeader>Credential Name</TableHeader>
			<TableHeader>Credential Type</TableHeader>
			<TableHeader>Created On</TableHeader>
			<TableHeader>Status</TableHeader>
		{/if}
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
		{#if variant === "admin"}
			{#each credentials as credential, i (credential.id)}
				<TableRow {i}>
					<TableData onClick={() => (selectedCred = credential)}
						>{credential.name}</TableData
					>
					<TableData onClick={() => (selectedCred = credential)}
						>{credential.referenceCode}</TableData
					>
					<TableData onClick={() => (selectedCred = credential)}
						>{credential.type}</TableData
					>
					<TableData onClick={() => (selectedCred = credential)}
						>{new Date(credential.createdAt).toDateString()}</TableData
					>
				</TableRow>
			{/each}
		{:else}
			{#each applications as application, i (application.id)}
				<TableRow {i}>
					<TableData onClick={() => (selectedApplication = application)}
						>{application.Credential.name}</TableData
					>
					<TableData onClick={() => (selectedApplication = application)}
						>{application.Credential.type}</TableData
					>
					<TableData onClick={() => (selectedApplication = application)}
						>{new Date(application.createdAt).toDateString()}</TableData
					>
					<TableData onClick={() => (selectedApplication = application)}>
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
		{/if}
	{/await}
</Table>
