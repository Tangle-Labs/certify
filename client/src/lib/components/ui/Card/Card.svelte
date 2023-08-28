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

			&.no-border {
				padding: 0px;
			}
		}
	}

	.side-card {
		max-height: calc(100vh - 220px);
		.body {
			overflow: scroll;
			scrollbar-width: none;
			max-height: calc(100vh - 260px);

			&::-webkit-scrollbar {
				display: none;
			}
		}
	}

	.side-card.with-header {
		max-height: calc(100vh - 220px);
		.body {
			max-height: calc(100vh - 350px);
		}
	}
</style>

<script lang="ts">
	export let noBorder = false;
	export let sideCard = false;
	export let withHeader = false;
</script>

<div class="card" class:side-card={sideCard} class:with-header={withHeader}>
	<div class="header">
		<slot name="header" />
	</div>
	<div class="body" class:no-border={noBorder}>
		<slot />
	</div>
</div>
