<style lang="scss">
	.card {
		box-shadow: var(--box-shadow);
		background-color: var(--body-background);
		border-radius: 5px;
		box-sizing: border-box;

		.header {
			width: 100%;
		}

		.body {
			padding: 15px;
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
