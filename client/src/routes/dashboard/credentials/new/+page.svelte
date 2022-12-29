<style lang="scss">
	.parallel-flex {
		display: flex;

		.card-block {
			padding: 35px;
			box-sizing: content-box;
			max-height: calc(100vh - 320px);
			overflow-y: auto;
			width: calc(65vw - 350px);

			.parallel-block {
				display: flex;
				justify-content: space-between;

				.input-container {
					padding: 20px 0;
					width: 45%;
				}
			}

			h3 {
				padding-top: 50px;
				padding-bottom: 15px;
				border-bottom: 1.5px solid gray;
			}

			.add-button {
				padding-top: 30px;
				width: fit-content;
			}
		}

		.preview-block {
			margin-left: 40px;
			width: 35%;
			border-radius: 5px;

			.preview-card {
				padding: 30px;

				h3 {
					border-bottom: 1px solid gray;
					padding: 10px;

					&:last-of-type {
						border-bottom: none;
						margin-bottom: 20px;
					}
				}

				.warn {
					padding-bottom: 20px;
					text-align: center;
				}
			}

			.button-container {
				padding: 5px 0;
			}
		}
	}
</style>

<script lang="ts">
	import { Card, Input, ComboInput, Button } from "$lib/components/ui/";
	import { CardWithHeader } from "$lib/components/project";
	import { goto } from "$app/navigation";
	import { axios } from "$lib/utils/axios.utils";

	let name: string;
	let referenceCode: string;
	let type: string;
	let durationCount: number;
	let durationUnit: string;

	let customFields: Array<{
		id: string;
		fieldName: string;
		fieldType: string;
	}> = [];

	const addCustomField = () => {
		const customField = {
			fieldName: "",
			fieldType: "text",
			id: (Math.random() + 1).toString(36).substring(7)
		};

		customFields = [...customFields, customField];
	};

	const getDuration = (): number => {
		const duration =
			durationCount *
			(durationUnit === "days"
				? 86400
				: durationUnit === "weeks"
				? 86400 * 7
				: durationUnit === "months"
				? 86400 * 30
				: durationUnit === "years"
				? 86400 * 365
				: 1);

		return duration;
	};

	const handleSubmit = async () => {
		const duration = getDuration();
		const { data } = await axios.post("/credentials", {
			name,
			referenceCode,
			type,
			duration,
			customFields
		});
		goto("/dashboard/credentials");
	};
</script>

<div class="parallel-flex">
	<Card>
		<div class="card-block">
			<div class="mandatory-block">
				<div class="parallel-block">
					<div class="input-container">
						<Input
							label="Credential Name"
							bind:value={name}
							placeholder="Enter Credential Name"
						/>
					</div>
					<div class="input-container">
						<Input
							label="Credential Reference Code"
							bind:value={referenceCode}
							placeholder="Enter Reference Code"
						/>
					</div>
				</div>

				<div class="parallel-block">
					<div class="input-container">
						<Input label="Credential Type" variant="dropdown" bind:value={type}>
							<option disabled selected={true}>Select Credential Type</option>
							<option value="certificate">Certificate</option>
							<option value="license">License</option>
							<option value="ticket">Ticket</option>
						</Input>
					</div>
					<div class="input-container">
						<ComboInput
							label="Credential Duration"
							bind:value={durationCount}
							bind:unit={durationUnit}
							placeholder="Credential Duration"
						>
							<option value="days" selected>Days</option>
							<option value="weeks">Weeks</option>
							<option value="months">Months</option>
							<option value="years">Years</option>
						</ComboInput>
					</div>
				</div>
			</div>

			<h3>Custom Credential Fields</h3>

			<div class="custom-fields">
				{#each customFields as field (field.id)}
					<div class="parallel-block">
						<div class="input-container">
							<Input
								bind:value={field.fieldName}
								placeholder="Enter Field Name"
								label="Field Name"
							/>
						</div>

						<div class="input-container">
							<Input
								bind:value={field.fieldType}
								label="Field Type"
								variant="dropdown"
							>
								<option selected value="textbox">text</option>
								<option value="email">email</option>
								<option value="number">number</option>
							</Input>
						</div>
					</div>
				{/each}

				<div class="add-button">
					<Button
						label="+ Add Custom Field"
						variant="tertiary"
						onClick={addCustomField}
					/>
				</div>
			</div>
		</div>
	</Card>

	<div class="preview-block">
		<CardWithHeader header="Preview Credential">
			<div class="preview-card">
				<div class="fields">
					{#if customFields.length > 0}
						{#each customFields as field (field.id)}
							<h3>{field.fieldName}</h3>
						{/each}
					{:else}
						<p class="warn">Add more custom fields to preview</p>
					{/if}
				</div>

				<div class="button-container">
					<Button label="Save Credential" onClick={handleSubmit} />
				</div>

				<div class="button-container">
					<Button
						label="Cancel"
						variant="tertiary"
						onClick={() => {
							goto("/dashboard/credentials");
						}}
					/>
				</div>
			</div>
		</CardWithHeader>
	</div>
</div>
