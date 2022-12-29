<style lang="scss">
	.form {
		width: 100%;

		.text-block {
			margin: 10px 0;
		}

		.button-block {
			margin: 30px 0;
		}
	}
</style>

<script lang="ts">
	import { Button, Input } from "$lib/components/ui";

	export let password: string;
	export let confirmPassword: string;
	export let stepHandler: (...args: any[]) => any;
</script>

<div class="form">
	<div class="text-block">
		<Input
			label="Enter Password"
			variant={"password"}
			placeholder="Enter Password"
			bind:value={password}
		/>
	</div>
	<div class="text-block">
		<Input
			label="Confirm Password"
			variant={"password"}
			placeholder="Enter Organization Email"
			bind:value={confirmPassword}
		/>
	</div>

	<div class="button-block">
		<Button size="large" onClick={stepHandler} label="Save Password" />
	</div>
</div>
