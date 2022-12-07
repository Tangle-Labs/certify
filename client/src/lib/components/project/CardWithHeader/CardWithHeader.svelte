<style lang="scss">
	.header {
		background-color: var(--secondary);
		padding: 15px;
		text-align: center;
	}
</style>

<script lang="ts">
	import { Card } from "../../ui";

	export let header: string;
</script>

<Card>
	<div class="header" slot="header">
		<h1>{header}</h1>
	</div>

	<slot />
</Card>
