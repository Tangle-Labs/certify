<style lang="scss">
	.input-block {
		.combo-input-block {
			display: flex;
			width: 100%;
		}

		.label {
			color: var(--label-text);
			padding: 5px 0px;
		}

		.text-input,
		.dropdown {
			appearance: none;
			padding: 10px 16px;
			outline: none;
			font-size: 1rem;
			color: var(--header-text);
			border: 1.5px solid var(--alt-background);
			border-radius: 5px;
			font-family: var(--body-font);
			background-color: var(--alt-background);
			box-sizing: border-box;
			resize: none;
			transition: all 400ms;
			font-style: normal;
			width: 100%;

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

		.text-input {
			width: 65%;
			border-top-right-radius: 0px;
			border-bottom-right-radius: 0px;
			margin-right: 2px;
		}

		.dropdown-backdrop {
			width: 35%;
			background-color: var(--alt-background);
			border-radius: 5px;
			border-top-left-radius: 0px;
			border-bottom-left-radius: 0px;
			.dropdown {
				appearance: none;
				background: url("/imgs/ChevronDown.svg") no-repeat center / contain;
				background-size: 20px;
				background-position: calc(100% - 10px);
			}
		}
	}
</style>

<script lang="ts">
	export let value: number;
	export let unit: string;
	export let label: string | null = null;
	export let placeholder: string;
</script>

<div class="input-block">
	{#if label}
		<div class="label">{label}</div>
	{/if}
	<div class="combo-input-block">
		<input class="text-input" {placeholder} type="number" bind:value />
		<div class="dropdown-backdrop">
			<select bind:value={unit} class="dropdown">
				<slot />
			</select>
		</div>
	</div>
</div>
