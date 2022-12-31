<style lang="scss">
	.page-body {
		display: flex;
		width: 100%;

		.card-container {
			width: 65%;
			margin-right: 40px;
		}

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

		.application-card {
			width: 35%;

			.card-body {
				padding: 30px;

				.warn {
					padding-bottom: 20px;
					text-align: center;
				}

				.info-block {
					padding: 10px;
					border-bottom: 2px solid var(--alt-background);

					.header {
						color: var(--label-text);
						font-weight: 600;
						font-size: 1.1rem;
					}

					.data {
						padding: 7.5px 0;
						font-size: 1rem;
					}

					&:last-of-type {
						border-bottom: none;
					}
				}

				.buttons {
					padding: 15px 0;

					.button-container {
						padding: 5px 0;
					}
				}
			}
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
		<ApplicationTable {applications} bind:selected {load} />
	</div>

	<div class="application-card">
		<ApplicationCard {selected} {load} />
	</div>
</div>
