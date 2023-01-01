<style lang="scss">
	.content {
		padding: 40px 20px;

		.logo {
			width: fit-content;
			display: flex;
			flex-wrap: wrap;

			.shield {
				img {
					height: 100px;
				}
			}

			.text {
				padding: 20px 0;
				width: 100%;
			}

			.version {
				font-size: 1.25rem;
				font-weight: 600;
			}
		}
	}
</style>

<script lang="ts">
	import { apiClient } from "$lib/utils";

	let version: string;

	const loadApplicationInfo = async () => {
		const { data } = await apiClient.get("/info");
		version = data.version;
	};

	const load = loadApplicationInfo();
</script>

<h2>Application Information</h2>

<div class="content">
	<div class="logo">
		<div class="shield">
			<img src="/imgs/CertifyBlue.svg" alt="" />
		</div>
		<div class="text">
			<img src="/imgs/CertifyTextWhite.svg" alt="" />
		</div>
		<div class="version">
			{#await load then}
				{#if version}
					<div class="version">v{version}</div>
				{/if}
			{/await}
		</div>
	</div>
</div>
