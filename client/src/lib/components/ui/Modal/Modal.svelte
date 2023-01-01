<style lang="scss">
	.backdrop {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		width: 100vw;
		height: 100vh;
		z-index: 5;
		background-color: var(--backdrop);
	}

	.modal {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 10;
		background-color: var(--body-background);
		border-radius: 5px;
		max-width: 90vw;
		min-width: 600px;
	}

	@media only screen and (max-width: 700px) {
		.modal {
			min-width: 80vw;
		}
	}
</style>

<script lang="ts">
	import { fade, fly } from "svelte/transition";
	import { CardWithHeader } from "$lib/components/project";

	export let isOpen: boolean;
	export let header: string;
</script>

{#if isOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="backdrop" on:click={() => (isOpen = false)} transition:fade />
	<div class="modal" transition:fly={{ y: 50, duration: 400 }}>
		<CardWithHeader {header}>
			<slot />
		</CardWithHeader>
	</div>
{/if}
