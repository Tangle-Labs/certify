<style lang="scss">
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

	export let selected: IApplication;

	const modifyStatus = async (approve: boolean) => {
		const { data } = await apiClient.patch(
			`/admin/applications/${selected.id}`,
			{ approve }
		);
		console.log(data);
	};
</script>

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
			{#if selected.status === "pending"}
				<div class="buttons">
					<div class="button-container">
						<Button
							onClick={() => modifyStatus(true)}
							label="Issue Credential"
						/>
					</div>
					<div class="button-container">
						<Button
							onClick={() => modifyStatus(false)}
							variant="tertiary"
							label="Reject Credential"
						/>
					</div>
				</div>
			{/if}
		{:else}
			<div class="warn">Please select an application</div>
		{/if}
	</div>
</CardWithHeader>
