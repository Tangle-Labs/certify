<style lang="scss">
	.input-block {
		padding: 20px 0;
		width: 500px;
	}
</style>

<script lang="ts">
	import { Input } from "$lib/components/ui";
	let lang: string;
</script>

<h2>Application Settings</h2>

<div class="input-block">
	<Input variant="dropdown" bind:value={lang} label="Language">
		<option value="en_US">English (US)</option>
	</Input>
</div>
