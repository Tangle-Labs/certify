<style lang="scss">
	.card-body {
		padding: 30px;

		.prompt {
			text-align: center;
			font-size: 1.2rem;
			padding-bottom: 30px;
		}

		.buttons {
			.button {
				padding: 5px 0;
			}
		}
	}
</style>

<script lang="ts">
	import { Modal, Button } from "$lib/components/ui";

	export let showConfirmation: boolean;
	export let confirmAction: () => Promise<any>;
	export let confirmationPrompt: string;
</script>

<Modal bind:isOpen={showConfirmation} header="Confirm Action">
	<div class="card-body">
		<p class="prompt">Are you sure you want to {confirmationPrompt}?</p>
		<div class="buttons">
			<div class="button">
				<Button label={confirmationPrompt} onClick={confirmAction} />
			</div>
			<div class="button">
				<Button
					label="Cancel"
					variant="tertiary"
					onClick={() => (showConfirmation = false)}
				/>
			</div>
		</div>
	</div>
</Modal>
