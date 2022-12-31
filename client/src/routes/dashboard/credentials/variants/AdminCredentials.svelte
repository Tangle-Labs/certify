<style lang="scss">
	.page-body {
		display: flex;

		.credentials-table {
			width: 65%;
			margin-right: 40px;
		}

		.sidebar {
			width: 35%;
			position: relative;

			.new-cred {
				width: 400px;
				position: absolute;
				top: -85px;
				right: 0;
			}
		}
	}
</style>

<script lang="ts">
	import { goto } from "$app/navigation";
	import { Button } from "$lib/components/ui";
	import { apiClient } from "$lib/utils";
	import type { ICredential } from "$lib/types";
	import CredentialsTable from "../credentials-components/CredentialsTable.svelte";
	import CredentialsCard from "../credentials-components/CredentialsCard.svelte";

	let credentials: ICredential[];
	let selectedCred: ICredential | null = null;

	const goToNewCredentialsPage = () => {
		goto("/dashboard/credentials/new");
	};

	const loadCredentials = async () => {
		const { data } = await apiClient.get("/credentials");
		credentials = data;
	};

	const load = loadCredentials();
</script>

<div class="page-body">
	<div class="credentials-table">
		<CredentialsTable bind:selectedCred {credentials} {load} variant="admin" />
	</div>
	<div class="sidebar">
		<div class="new-cred">
			<Button
				label="+ New Credential"
				onClick={goToNewCredentialsPage}
				size="large"
			/>
		</div>
		<CredentialsCard bind:selectedCred />
	</div>
</div>
