<style lang="scss">
	.page-body {
		display: flex;
		width: 100%;

		.application-card {
			width: 35%;
		}
	}
</style>

<script lang="ts">
	import { apiClient } from "$lib/utils";
	import type { IApplication, IUserStats } from "$lib/types";
	import ApplicationTable from "../applications/application-components/ApplicationTable.svelte";
	import ApplicationCard from "../applications/application-components/ApplicationCard.svelte";
	import { Card, Skeleton } from "$lib/components/ui";
	import type { IAdminStats } from "$lib/types";
	import { user } from "$lib/stores";

	let applications: IApplication[];
	let selected: IApplication;

	async function loadPage() {
		const { data: applicationsData } = await apiClient.get(
			$user.isSuperUser ? "/admin/applications" : "/applications"
		);
		applications = applicationsData;
	}

	const load = loadPage();
</script>

<div class="page-body">
	<Card noBorder={true}>
		<h1>Applications</h1>
	</Card>
	<ApplicationTable dashboardTable {applications} bind:selected {load} />
	<div class="application-card">
		<ApplicationCard {selected} variant={"user"} {loadPage} />
	</div>
</div>
