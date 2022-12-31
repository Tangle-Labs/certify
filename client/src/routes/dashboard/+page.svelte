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
	import { apiClient, secondsToStr } from "$lib/utils";
	import {
		Table,
		TableRow,
		TableHeader,
		TableData,
		Skeleton,
		Button
	} from "$lib/components/ui/";
	import { CardWithHeader } from "$lib/components/project";
	import type { IApplication } from "$lib/types";

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
						<TableData onClick={() => (selected = application)}
							>{application.status}</TableData
						>
					</TableRow>
				{/each}
			{/await}
		</Table>
	</div>

	<div class="application-card">
		<CardWithHeader header="View Application">
			<div class="card-body">
				{#if selected}
					<div class="info-block">
						<div class="header">User's Name</div>
						<div class="data">{selected.User?.name}</div>
					</div>
					<div class="info-block">
						<div class="header">User's E-Mail</div>
						<div class="data">{selected.User?.email}</div>
					</div>
					<div class="info-block">
						<div class="header">Credential Name</div>
						<div class="data">{selected.Credential?.name}</div>
					</div>
					<div class="info-block">
						<div class="header">Credential Type</div>
						<div class="data">{selected.Credential?.type}</div>
					</div>
					<div class="info-block">
						<div class="header">Credential Validity</div>
						<div class="data">
							{secondsToStr(selected.Credential?.duration ?? 0)}
						</div>
					</div>
					{#each Object.keys(selected.body) as key (key)}
						<div class="info-block">
							<div class="header">{key}</div>
							<div class="data">{selected.body[key]}</div>
						</div>
					{/each}
					<div class="buttons">
						<div class="button-container">
							<Button onClick={() => null} label="Issue Credential" />
						</div>
						<div class="button-container">
							<Button
								onClick={() => null}
								variant="tertiary"
								label="Reject Credential"
							/>
						</div>
					</div>
				{:else}
					<div class="warn">Please select an application</div>
				{/if}
			</div>
		</CardWithHeader>
	</div>
</div>
