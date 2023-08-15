<style lang="scss">
	.table {
		width: 100%;
		overflow: scroll;
		border-collapse: collapse;
		display: block;
		box-shadow: var(--box-shadow);
		scrollbar-width: none;

		&::-webkit-scrollbar {
			display: none;
		}
	}

	.table.dashboard-table {
		max-height: calc(100vh - 635px);
	}

	.table.page-table {
		max-height: calc(100vh - 220px);
	}
</style>

<script lang="ts">
	export let dashboardTable = false;
	export let pageTable = false;
</script>

<table
	class="table"
	class:dashboard-table={dashboardTable}
	class:page-table={pageTable}>
	<slot />
</table>
