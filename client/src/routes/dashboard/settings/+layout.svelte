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
			width: 100%;
		}
	}
</style>

<script lang="ts">
	import { afterNavigate, goto } from "$app/navigation";
	import { Card } from "$lib/components/ui";
	import type { SettingsTab } from "$lib/types";

	let settingsTab: SettingsTab = "general";

	const navigateTo = (tab: SettingsTab) => {
		const tabUrl = tab.replace(" ", "-").toLowerCase();
		goto(`/dashboard/settings/${tabUrl}`);
		settingsTab = tab;
	};

	const getSelected = (url: string) => {
		const [_, slug] = url.toString().split("/settings/");
		if (!slug) return goto("/dashboard/settings/general");
		const tab = slug.replace(" ", "-");
		settingsTab = tab as SettingsTab;
	};

	afterNavigate(({ to }) => {
		if (!to) return;
		getSelected(to.url.toString());
	});

	getSelected(window.location.href);
</script>

<Card>
	<div class="card-body">
		<div class="sidebar">
			<button
				class:is-selected={settingsTab === "general"}
				on:click={() => navigateTo("general")}
			>
				General
			</button>
			<button
				class:is-selected={settingsTab === "organization"}
				on:click={() => navigateTo("organization")}
			>
				Organization
			</button>
			<button
				class:is-selected={settingsTab === "roles"}
				on:click={() => navigateTo("roles")}
			>
				Roles
			</button>
			<button
				class:is-selected={settingsTab === "dns"}
				on:click={() => navigateTo("dns")}
			>
				DNS
			</button>
			<button
				class:is-selected={settingsTab === "app info"}
				on:click={() => navigateTo("app info")}
			>
				App Info
			</button>
		</div>
		<div class="settings-body">
			<slot />
		</div>
	</div>
</Card>
