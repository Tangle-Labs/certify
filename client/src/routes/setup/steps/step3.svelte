<style lang="scss">
	.form {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;

		.logo-block {
			width: 100%;
			text-align: center;

			.logo {
				height: 150px;
			}

			h1 {
				font-size: 3rem;
			}
		}

        .did {
            background-color: var(--alt-background);
            padding: 10px;
            box-sizing: border-box;
            width: 100%;
            margin: 20px 0;
            border-radius: 5px;
            word-break: break-all;
            font-family: var(--monospace-font);
            color: var(--label-text);
        }

		.loader-block {
			display: flex;
			justify-content: center;
			padding: 50px;
			padding-top: 30px;
		}

		.button-block {
			margin: 30px 0;
			width: 100%;
		}
	}
</style>

<script lang="ts">
	import { Button } from "$lib/components/ui";
	import { Chasing } from "svelte-loading-spinners";

	export let isDisabled: boolean;
	export let didInfo: Record<string, any>;
	export let stepHandler: (...args: any[]) => any;
</script>

<div class="form">
	<div class="logo-block">
		<img src="/imgs/certify.svg" class="logo" />
		<h1>CERTIFY</h1>

		{#if didInfo}
			<div class="did">{didInfo.did.doc.id}</div>
		{:else}
			<div class="loader-block">
				<Chasing color="var(--primary)" size="40" />
			</div>
		{/if}

		{#if didInfo}
			<p>DID has been created!</p>
		{:else}
			<p>Your identity is being created</p>
		{/if}
	</div>

	<div class="button-block">
		<Button size="large" bind:isDisabled onClick={stepHandler} label="Continue to Login" />
	</div>
</div>
