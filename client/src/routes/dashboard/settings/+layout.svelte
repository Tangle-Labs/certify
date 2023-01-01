<style lang="scss">
	.card-body {
		display: flex;
		height: calc(100vh - 260px);
		padding: 40px;
		box-sizing: border-box;

		.sidebar {
			width: 250px;
			height: fit-content;
			display: flex;
			flex-wrap: wrap;

			button {
				width: 100%;
				margin-top: 10px;
				padding: 15px;
				font-size: 1.2rem;
				box-sizing: border-box;
				border: none;
				border-bottom: 2px solid var(--alt-background);
				color: var(--header-text);
				background: var(--background);
				transition: all 0.4s;

				&.is-selected {
					background: var(--table-header);
				}

				&:first-of-type {
					margin-top: 0;
				}

				&:hover {
					cursor: pointer;
					background: var(--table-header-hover);
				}
			}
		}

		.settings-body {
			padding: 0px 40px;
		}
	}
</style>

<script lang="ts">
	import { goto } from "$app/navigation";
	import { Card } from "$lib/components/ui";
	import type { SettingsTab } from "$lib/types";

	let settingsTab: SettingsTab = "General";

	const navigateTo = (tab: SettingsTab) => {
		const tabUrl = tab.replace(" ", "-").toLowerCase();
		goto(`/dashboard/settings/${tabUrl}`);
		settingsTab = tab;
	};
</script>

<Card>
	<div class="card-body">
		<div class="sidebar">
			<button
				class:is-selected={settingsTab === "General"}
				on:click={() => navigateTo("General")}
			>
				General
			</button>
			<button
				class:is-selected={settingsTab === "Organization"}
				on:click={() => navigateTo("Organization")}
			>
				Organization
			</button>
			<button
				class:is-selected={settingsTab === "Roles"}
				on:click={() => navigateTo("Roles")}
			>
				Roles
			</button>
			<button
				class:is-selected={settingsTab === "DNS"}
				on:click={() => navigateTo("DNS")}
			>
				DNS
			</button>
			<button
				class:is-selected={settingsTab === "App Info"}
				on:click={() => navigateTo("App Info")}
			>
				App Info
			</button>
		</div>
		<div class="settings-body">
			<slot />
		</div>
	</div>
</Card>
