<style lang="scss">
	.card-body {
		padding: 30px;

		.warn {
			padding-bottom: 20px;
			text-align: center;
		}

		h3 {
			border-bottom: 1px solid gray;
			padding: 10px;

			&:last-of-type {
				border-bottom: none;
				margin-bottom: 20px;
			}
		}

		.buttons {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			padding-top: 30px;

			.button-container {
				width: 100%;
				padding: 5px 0;
				display: flex;
				justify-content: center;
			}
		}
	}
</style>

<script lang="ts">
	import { Button } from "$lib/components/ui";
	import { CardWithHeader } from "$lib/components/project";
	import type { ICredential } from "$lib/types";

	export let selectedCred: ICredential | null;
</script>

<CardWithHeader header="View Credential">
	<div class="card-body">
		{#if selectedCred}
			{#each selectedCred.customFields as field (field.id)}
				<h3>{field.fieldName}</h3>
			{/each}

			<div class="buttons">
				<div class="button-container">
					<Button label="Issue Credential" onClick={() => null} />
				</div>

				<div class="button-container">
					<Button
						label="Cancel"
						variant="tertiary"
						onClick={() => (selectedCred = null)}
					/>
				</div>
			</div>
		{:else}
			<div class="warn">Please select a credential to continue</div>
		{/if}
	</div>
</CardWithHeader>
