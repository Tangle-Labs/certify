<style>
	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
	}
</style>

<script lang="ts">
	import { axios } from "$lib/utils/axios.utils";

	async function loadPage() {
		const { data } = await axios.get("/users");
		return data;
	}

	const load = loadPage();
</script>

{#await load}
	<div class="loading">
		<h1>Loading...</h1>
	</div>
{:then data}
	<h1>Hi there {data.email}</h1>
{/await}
