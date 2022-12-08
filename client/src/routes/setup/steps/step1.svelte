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
	import { Button, TextInput } from "$lib/components/ui";

	export let orgName: string;
	export let orgEmail: string;
	export let confirmEmail: string;

	export let stepHandler: (...args: any[]) => any;
</script>

<div class="form">
	<div class="text-block">
		<TextInput
			label="Organization Name"
			placeholder="Enter Organization Name"
			bind:value={orgName}
		/>
	</div>
	<div class="text-block">
		<TextInput
			label="Organization Email"
			variant={"email"}
			placeholder="Enter Organization Email"
			bind:value={orgEmail}
		/>
	</div>
	<div class="text-block">
		<TextInput
			label="Confirm Email"
			variant={"email"}
			placeholder="Confirm Email"
			bind:value={confirmEmail}
		/>
	</div>

	<div class="button-block">
		<Button size="large" onClick={stepHandler} label="Create Organization" />
	</div>
</div>
