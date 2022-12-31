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
	import type { IApplication } from "$lib/types";
	import { Button } from "$lib/components/ui";
	import { apiClient } from "$lib/utils";
	import CredentialsTable from "../credentials-components/CredentialsTable.svelte";
	import ApplicationCard from "../../applications/application-components/ApplicationCard.svelte";
	import { goto } from "$app/navigation";

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
		<div class="new-cred">
			<Button
				label="Apply for Credential"
				onClick={() => goto("/dashboard/credentials/new")}
				size="large"
			/>
		</div>
		<ApplicationCard bind:selected={selectedApplication} variant="user" />
	</div>
</div>
