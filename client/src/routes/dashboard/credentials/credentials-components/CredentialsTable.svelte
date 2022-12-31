<script lang="ts">
	import { goto } from "$app/navigation";
	import {
		Button,
		Table,
		TableData,
		TableHeader,
		TableRow,
		Skeleton
	} from "$lib/components/ui";
	import type { ICredential } from "$lib/types";

	export let credentials: ICredential[];
	export let selectedCred: ICredential | null = null;
	export let load: Promise<any>;

	const setSelectedCred = (id: string) => {
		const match = credentials.find((c) => id === c.id);
		console.log(match);
		selectedCred = match ?? null;
	};
</script>

<Table>
	<TableRow isHeader={true}>
		<TableHeader>Credential Name</TableHeader>
		<TableHeader>Reference Code</TableHeader>
		<TableHeader>Credential Type</TableHeader>
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
		{#each credentials as credential, i (credential.id)}
			<TableRow {i}>
				<TableData onClick={() => setSelectedCred(credential.id)}
					>{credential.name}</TableData
				>
				<TableData onClick={() => setSelectedCred(credential.id)}
					>{credential.referenceCode}</TableData
				>
				<TableData onClick={() => setSelectedCred(credential.id)}
					>{credential.type}</TableData
				>
				<TableData onClick={() => setSelectedCred(credential.id)}
					>{new Date(credential.createdAt).toDateString()}</TableData
				>
			</TableRow>
		{/each}
	{/await}
</Table>
