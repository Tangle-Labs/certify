<script lang="ts">
	import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
	import Input from "./Input.svelte";

	let value: string;
</script>

<Meta title="Input" component={Input} />

<Template let:args>
	<Input bind:value placeholder="severus@hogwarts.edu" {...args}>
		<option disabled={true}>select an option</option>
		<option value="doggers">License</option>
		<option value="doggers">Certificate</option>
	</Input>
</Template>

<Story name="Input" />
<Story name="With Label" args={{ label: "Email Address" }} />
<Story name="TextArea" args={{ variant: "textarea" }} />
<Story
	name="Dropdown"
	args={{ variant: "dropdown", label: "Credential Type" }}
/>
