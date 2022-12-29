<style lang="scss">
	.row {
		transition: 0.5s all;
		background: var(--body-background);
		user-select: none;

		&:hover {
			background: var(--table-header-hover);
		}
	}

	.alternative {
		background: var(--body-alt);
	}

	.header {
		background: var(--table-header);

		&:hover {
			background: var(--table-header);
			cursor: pointer;
		}
	}
</style>

<script lang="ts">
	export let i = 0;
	export let isHeader = false;
	export let onClick: (...args: any[]) => any = () => null;
</script>

<tr class="row" class:alternative={i % 2 === 1} class:header={isHeader}>
	<slot />
</tr>
