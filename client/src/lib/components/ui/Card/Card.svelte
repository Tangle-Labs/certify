<style lang="scss">
	.card {
		box-shadow: var(--box-shadow);
		background-color: var(--body-background);
		padding: 15px;
		border-radius: 5px;

		.header {
			width: 100%;
		}
	}
</style>

<div class="card">
	<div class="header">
		<slot name="header" />
	</div>
	<div class="body">
		<slot />
	</div>
</div>
