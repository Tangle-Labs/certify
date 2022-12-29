<script lang="ts">
	import { goto } from "$app/navigation";
	import { Button, Table, TableData, TableHeader, TableRow } from "$lib/components/ui";
	import { axios } from "$lib/utils"
	import type { ICredential } from "./credentials.types";

	let credentials: ICredential[];

	const goToNewCredentialsPage = () => {
		goto("/dashboard/credentials/new");
	}

	const loadCredentials = async () => {
		const { data} = await axios.get("/credentials");
		credentials= data;
	}

	const load = loadCredentials();


</script>




	<Table>

		<TableRow isHeader={true}>
			<TableHeader>Credential Name</TableHeader>
			<TableHeader>Reference Code</TableHeader>
			<TableHeader>Credential Type</TableHeader>
			<TableHeader>Created On</TableHeader>
		</TableRow>

{#await load}

{:then data}
		{#each credentials as credential, i (credential.id)}
			<TableRow {i}>
				<TableData>{credential.name}</TableData>
				<TableData>{credential.referenceCode}</TableData>
				<TableData>{credential.type}</TableData>
				<TableData>{new Date(credential.createdAt).toDateString()}</TableData>
			</TableRow>
		{/each}

{/await}

	</Table>
