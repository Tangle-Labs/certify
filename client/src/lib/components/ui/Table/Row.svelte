<style lang="scss">
	.row {
		background: var(--body-background);
	}

	.alternative {
		background: var(--body-alt);
	}

	.header {
		background: var(--table-header);
	}
</style>

<script lang="ts">
	export let i = 0;
	export let isHeader = false;
</script>

<tr class="row" class:alternative={i % 2 === 1} class:header={isHeader}>
	<slot />
</tr>
