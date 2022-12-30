<style lang="scss">
	.nav-button {
		width: 100%;
		background: var(--body-background);
		padding: 20px 60px;
		box-sizing: border-box;
		transition: 0.4s all;
		border: 0;
		text-align: left;
		font-size: 1.15rem;
		color: white;
		font-weight: 400;

		&:hover {
			cursor: pointer;
		}

		&.primary {
			&:hover {
				background: var(--table-header-hover);
			}
		}

		&.secondary {
			color: var(--label-text);

			&:hover {
				background: var(--body-background);
			}
		}

		&.is-selected {
			background: var(--table-header);
		}

		&.highlight {
			color: var(--primary-alt);
			background: var(--primary);
			text-align: center;

			&:hover {
				background: var(--primary-hover);
			}
		}
	}
</style>

<script lang="ts">
	export let label = "";
	export let onClick: (...args: any[]) => any = () => null;
	export let isSelected: boolean;
	export let variant: "primary" | "highlight" | "secondary" = "primary";
	export let redirect = "#";
</script>

<a href={redirect}>
	<button
		class="nav-button"
		class:is-selected={isSelected}
		class:primary={variant === "primary"}
		class:highlight={variant === "highlight"}
		class:secondary={variant === "secondary"}
		on:click={onClick}
	>
		{label}
		<slot />
	</button>
</a>
