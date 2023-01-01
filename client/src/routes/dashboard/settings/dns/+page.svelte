<style lang="scss">
	.page-content {
		padding: 20px 0;

		.mono {
			padding: 15px 0;

			.header {
				color: var(--label-text);
			}

			.block {
				padding: 10px;
				border-radius: 5px;
				background: var(--alt-background);
				font-family: var(--monospace-font);
				margin-top: 5px;
			}
		}
	}
</style>

<script lang="ts">
	import { apiClient } from "$lib/utils";

	let did: string;
	const getData = async () => {
		const { data } = await apiClient.get("/organization");
		did = data.did;
	};

	const load = getData();
</script>

<h2>DVID (DNS)</h2>

<div class="page-content">
	<p>Add the Following Record to your domain</p>
	{#await load then}
		<div class="mono">
			<div class="header">Type</div>
			<div class="block">TXT</div>
		</div>
		<div class="mono">
			<div class="header">Path</div>
			<div class="block">@</div>
		</div>
		<div class="mono">
			<div class="header">Value</div>
			<div class="block">DVID.did={did}</div>
		</div>
	{/await}
</div>
