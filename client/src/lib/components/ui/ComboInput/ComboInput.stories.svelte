<script lang="ts">
	import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
	import ComboInput from "./ComboInput.svelte";

	let value: string;
</script>

<Meta title="ComboInput" component={ComboInput} />

<Template let:args>
	<ComboInput label="poggers" bind:value placeholder="Years" {...args}>
		<option disabled={true}>select an option</option>
		<option value="doggers">License</option>
		<option value="doggers">Certificate</option>
	</ComboInput>
</Template>

<Story name="ComboInput" />
