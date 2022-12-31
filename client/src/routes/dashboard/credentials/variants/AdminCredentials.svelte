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

			.card-body {
				padding: 30px;

				.warn {
					padding-bottom: 20px;
					text-align: center;
				}

				h3 {
					border-bottom: 1px solid gray;
					padding: 10px;

					&:last-of-type {
						border-bottom: none;
						margin-bottom: 20px;
					}
				}

				.buttons {
					display: flex;
					flex-wrap: wrap;
					justify-content: center;
					padding-top: 30px;

					.button-container {
						width: 100%;
						padding: 5px 0;
						display: flex;
						justify-content: center;
					}
				}
			}
		}
	}
</style>

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
	import { CardWithHeader } from "$lib/components/project";
	import { apiClient } from "$lib/utils";
	import type { ICredential } from "$lib/types";

	let credentials: ICredential[];
	let selectedCred: ICredential | null = null;

	const goToNewCredentialsPage = () => {
		goto("/dashboard/credentials/new");
	};

	const loadCredentials = async () => {
		const { data } = await apiClient.get("/credentials");
		credentials = data;
	};

	const setSelectedCred = (id: string) => {
		const match = credentials.find((c) => id === c.id);
		console.log(match);
		selectedCred = match ?? null;
	};

	const load = loadCredentials();
</script>

<div class="page-body">
	<div class="credentials-table">
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
	</div>
	<div class="sidebar">
		<div class="new-cred">
			<Button
				label="+ New Credential"
				onClick={goToNewCredentialsPage}
				size="large"
			/>
		</div>
		<CardWithHeader header="View Credential">
			<div class="card-body">
				{#if selectedCred}
					{#each selectedCred.customFields as field (field.id)}
						<h3>{field.fieldName}</h3>
					{/each}

					<div class="buttons">
						<div class="button-container">
							<Button label="Issue Credential" onClick={() => null} />
						</div>

						<div class="button-container">
							<Button
								label="Cancel"
								variant="tertiary"
								onClick={() => (selectedCred = null)}
							/>
						</div>
					</div>
				{:else}
					<div class="warn">Please select a credential to continue</div>
				{/if}
			</div>
		</CardWithHeader>
	</div>
</div>
