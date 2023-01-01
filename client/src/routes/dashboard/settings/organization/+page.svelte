<style lang="scss">
	.input-block {
		padding: 10px 0;
		min-width: 500px;
	}

	.button {
		margin-top: 20px;
		width: 400px;
	}
</style>

<script lang="ts">
	import type { IOrganizationConfig } from "$lib/types";
	import { apiClient } from "$lib/utils";
	import { Input, Button, Skeleton } from "$lib/components/ui";

	let organizationConfig: IOrganizationConfig;

	const getOrganizationConfig = async () => {
		const { data } = await apiClient.get("/organization");
		organizationConfig = {
			...data,
			orgName: data.orgName ?? "",
			orgWebsite: data.orgWebsite ?? "",
			orgDescription: data.orgDescription ?? "",
			businessType: data.businessType ?? ""
		};
	};

	const handleUpdateOrg = async () => {
		const { data } = await apiClient.patch("/organization", {
			...organizationConfig
		});
	};

	const load = getOrganizationConfig();
</script>

<h2>Organization Profile</h2>

{#await load}
	<Skeleton />
	<Skeleton width={80} />
{:then}
	<div class="input-block">
		<Input
			bind:value={organizationConfig.orgName}
			label="Organization Name"
			placeholder="Enter Organization Name"
		/>
	</div>

	<div class="input-block">
		<Input
			bind:value={organizationConfig.orgWebsite}
			label="Organization Website"
			placeholder="https://organization.org"
		/>
	</div>

	<div class="input-block">
		<Input
			bind:value={organizationConfig.businessType}
			label="Business Type"
			placeholder="Enter business type"
		/>
	</div>

	<div class="input-block">
		<Input
			bind:value={organizationConfig.orgDescription}
			variant="textarea"
			label="Organization Description"
			placeholder="Business description"
		/>
	</div>

	<div class="button">
		<Button size="large" onClick={handleUpdateOrg} label="Save Details" />
	</div>
{/await}
