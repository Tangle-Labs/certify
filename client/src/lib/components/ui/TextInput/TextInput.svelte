<style lang="scss">
	.input-block {
		.label {
			color: var(--label-text);
			padding: 5px 0px;
		}

		.text-input,
		.text-input-block {
			padding: 10px 16px;
			outline: none;
			font-size: 1rem;
			color: var(--header-text);
			border: 1.5px solid var(--alt-background);
			border-radius: 5px;
			font-family: var(--body-font);
			background-color: var(--alt-background);
			width: 100%;
			box-sizing: border-box;
			resize: none;
			transition: all 400ms;
			font-style: normal;

			&::placeholder {
				font-style: normal;
			}

			&:focus {
				border: 1.5px solid var(--highlight);
			}

			&:hover {
				border: 1.5px solid var(--highlight-hover);
			}
		}
	}
</style>

<script lang="ts">
	export let value: string;
	export let variant: "textarea" | "textbox" | "password" | "email" = "textbox";
	export let placeholder: string;
	export let label: string | null = null;
</script>

<div class="input-block">
	{#if label}
		<div class="label">{label}</div>
	{/if}
	{#if variant === "textbox"}
		<input type="text" bind:value {placeholder} class="text-input" />
	{:else if variant === "password"}
		<input type="password" bind:value {placeholder} class="text-input" />
	{:else if variant === "email"}
		<input type="email" bind:value {placeholder} class="text-input" />
	{:else if variant === "textarea"}
		<textarea bind:value {placeholder} rows="10" class="text-input-block" />
	{/if}
</div>
