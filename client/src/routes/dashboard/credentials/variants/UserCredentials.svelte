<style lang="scss">
	.page-body {
		display: flex;

		.credentials-table {
			width: 65%;
			margin-right: 40px;
		}

		.sidebar {
			width: 35%;
		}
	}
</style>

<script lang="ts">
	import type { IApplication } from "$lib/types";
	import { apiClient } from "$lib/utils";
	import CredentialsTable from "../credentials-components/CredentialsTable.svelte";
	import ApplicationCard from "../../applications/application-components/ApplicationCard.svelte";

	let applications: IApplication[];
	let selectedApplication: IApplication;

	const loadApplications = async () => {
		const { data } = await apiClient.get("/applications");
		applications = data;
	};

	const load = loadApplications();
</script>

<div class="page-body">
	<div class="credentials-table">
		<CredentialsTable
			bind:selectedApplication
			{applications}
			{load}
			variant="user"
		/>
	</div>
	<div class="sidebar">
		<ApplicationCard bind:selected={selectedApplication} variant="user" />
	</div>
</div>
