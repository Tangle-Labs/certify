<style lang="scss">
	td {
		padding: 15px 20px;
		display: block;
		width: 100%;

		&:hover {
			cursor: pointer;
		}
	}
</style>

<script lang="ts">
	export let onClick: (...args: any[]) => any = () => null;
</script>

<td on:click={onClick}><slot /></td>
