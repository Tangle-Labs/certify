<style lang="scss">
	.card-content {
		padding: 30px;

		.input-container {
			padding: 10px 0;
		}

		.button-container {
			margin-top: 30px;
			width: 400px;
		}
	}
</style>

<script lang="ts">
	import { page } from "$app/stores";
	import { Card, Skeleton, Button, Input } from "$lib/components/ui";
	import { apiClient } from "$lib/utils";
	import type { ICredential } from "../../credentials.types";

	let credential: ICredential;

	const getCredential = async () => {
		const { slug } = $page.params;
		const { data } = await apiClient.get(`/credentials/${slug}`);
		credential = data;
	};

	const handleSubmit = async () => {
		const body = new Object();
		for (const field of credential.customFields) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			body[field.fieldName] = field.value;
		}
		console.log(body);
	};

	const loadCredential = getCredential();
</script>

<Card>
	<div class="card-content">
		{#await loadCredential}
			<Skeleton />
		{:then}
			<h2>{credential.name}</h2>
			{#each credential.customFields as field, i (field.id)}
				<div class="input-container">
					<Input
						label={field.fieldName}
						placeholder={`Enter ${field.fieldName}`}
						bind:value={credential.customFields[i].value}
					/>
				</div>
			{/each}

			<div class="button-container">
				<Button
					size="large"
					label="Submit Application"
					onClick={handleSubmit}
				/>
			</div>
		{/await}
	</div>
</Card>
