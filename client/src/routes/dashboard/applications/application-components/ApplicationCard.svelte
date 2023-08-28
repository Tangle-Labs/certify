<style lang="scss">
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
				word-break: break-all;
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
</style>

<script lang="ts">
	import { apiClient, secondsToStr } from "$lib/utils";
	import { Button, Qr } from "$lib/components/ui/";
	import { CardWithHeader } from "$lib/components/project";
	import type { IApplication } from "$lib/types";
	import axios from "axios";

	export let selected: IApplication;
	export let variant: "user" | "admin";
	let modified = false;
	let qr: string;

	const modifyStatus = async (approve: boolean) => {
		modified = true;
		const { data } = await apiClient.patch(
			`/admin/applications/${selected.id}`,
			{ approve }
		);
		loadPage();
	};

	$: ((app) => (modified = false))(selected);

	async function onApplicationChange(application: IApplication) {
		if (!application || variant === "admin") return;
		if (selected.status === "approved") {
			const { data } = await apiClient.get(
				"/oid4vc/credentials/" + application.id
			);
			const { uri } = data;
			qr = uri;
		}
	}

	$: onApplicationChange(selected);

	export let loadPage: () => Promise<void>;
	const header = variant === "admin" ? "View Application" : "View Credential";
</script>

<CardWithHeader {header}>
	<div class="card-body">
		{#if selected}
			{#if qr}
				<Qr data={qr} />
			{/if}
			{#if variant === "admin"}
				<div class="info-block">
					<div class="header">User's Name</div>
					<div class="data">{selected.User?.name ?? "None"}</div>
				</div>
				<div class="info-block">
					<div class="header">User's E-Mail</div>
					<div class="data">{selected.User?.email ?? "None"}</div>
				</div>
				<div class="info-block">
					<div class="header">User's DID</div>
					<div class="data">{selected.User?.did ?? "None"}</div>
				</div>
			{/if}
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
			{#if variant === "admin" && selected.status === "pending" && !modified}
				<div class="buttons">
					<div class="button-container">
						<Button
							onClick={() => modifyStatus(true)}
							label="Issue Credential" />
					</div>
					<div class="button-container">
						<Button
							onClick={() => modifyStatus(false)}
							variant="tertiary"
							label="Reject Credential" />
					</div>
				</div>
			{/if}
		{:else}
			<div class="warn">Please select an application</div>
		{/if}
	</div>
</CardWithHeader>
