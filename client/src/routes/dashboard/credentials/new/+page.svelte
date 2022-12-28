<script lang="ts">
	import { Card, Input } from "$lib/components/ui/";

	let name: string;
	let referenceCode: string;
	let type: string;
	let durationCount: number;
	let durationUnit: string;
</script>

<Card>
	<div class="card-block">
		<div class="input-container">
			<Input
				label="Credential Name"
				bind:value={name}
				placeholder="Enter Credential Name"
			/>
		</div>

		<div class="parallel-block">
			<div class="input-container" />
		</div>
	</div>
</Card>
