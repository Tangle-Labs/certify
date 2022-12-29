<style lang="scss">
	.input-block {
		width: 100%;
		box-sizing: border-box;
		.label {
			color: var(--label-text);
			padding: 5px 0px;
		}

		.text-input,
		.text-input-block,
		.dropdown {
			padding: 10px 16px;
			outline: none;
			font-size: 1rem;
			color: var(--header-text);
			border: 1.5px solid var(--alt-background);
			border-radius: 5px;
			font-family: var(--body-font);
			background-color: var(--alt-background);
			width: 100%;
			resize: none;
			transition: all 400ms;
			font-style: normal;
			box-sizing: border-box;

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

		.dropdown-backdrop {
			width: 100%;
			background-color: var(--alt-background);
			border-radius: 5px;
			.dropdown {
				appearance: none;
				background: url("/imgs/ChevronDown.svg") no-repeat center / contain;
				background-size: 20px;
				background-position: calc(100% - 10px);
				box-sizing: border-box;
			}
		}
	}
</style>

<script lang="ts">
	import type { InputVariants } from "./Input.types";

	export let value: string;
	export let variant: InputVariants = "textbox";
	export let placeholder = "";
	export let label: string | null = null;
	export let onChange: (...args: any[]) => any = () => null;
</script>

<div class="input-block">
	{#if label}
		<div class="label">{label}</div>
	{/if}
	{#if variant === "textbox"}
		<input
			type="text"
			bind:value
			{placeholder}
			class="text-input"
			on:change={onChange}
		/>
	{:else if variant === "password"}
		<input
			type="password"
			bind:value
			{placeholder}
			class="text-input"
			on:change={onChange}
		/>
	{:else if variant === "email"}
		<input
			type="email"
			bind:value
			{placeholder}
			class="text-input"
			on:change={onChange}
		/>
	{:else if variant === "textarea"}
		<textarea
			bind:value
			{placeholder}
			rows="10"
			class="text-input-block"
			on:change={onChange}
		/>
	{:else if variant === "dropdown"}
		<div class="dropdown-backdrop">
			<select bind:value class="dropdown">
				<slot />
			</select>
		</div>
	{/if}
</div>
