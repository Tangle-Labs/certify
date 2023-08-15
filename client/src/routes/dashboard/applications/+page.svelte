<style lang="scss">
	.page-body {
		display: flex;
		width: 100%;

		.card-container {
			width: 65%;
			margin-right: 40px;
		}

		.application-card {
			width: 35%;
		}
	}
</style>

<script lang="ts">
	import { apiClient } from "$lib/utils";
	import type { IApplication } from "$lib/types";
	import ApplicationTable from "./application-components/ApplicationTable.svelte";
	import ApplicationCard from "./application-components/ApplicationCard.svelte";

	let applications: IApplication[];
	let selected: IApplication;

	async function loadPage() {
		const { data } = await apiClient.get("/admin/applications");
		applications = data;
	}

	const load = loadPage();
</script>

<div class="page-body">
	<div class="card-container">
		<ApplicationTable pageTable {applications} bind:selected {load} />
	</div>

	<div class="application-card">
		<ApplicationCard {selected} {loadPage} variant="admin" />
	</div>
</div>
