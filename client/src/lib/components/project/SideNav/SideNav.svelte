<style lang="scss">
	.side-nav {
		background: var(--body-background);
		width: 300px;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		align-content: space-between;

		.buttons {
			h1 {
				padding: 20px 60px;
			}

			.hr {
				margin: 0;
				border-bottom: 1px solid rgb(133, 133, 133);
			}
		}

		.bottom {
			width: 100%;
			padding-bottom: 50px;
		}
	}
</style>

<script lang="ts">
	import { goto } from "$app/navigation";
	import { NavButton } from "$lib/components/project";
	import { Skeleton } from "$lib/components/ui";
	import { user } from "$lib/stores";
	import { apiClient } from "$lib/utils";
	import type { DashboardPath } from "./SideNav.types";

	export let selected: DashboardPath;
	export let loadPromise: Promise<any>;

	const isSelected = (s: DashboardPath, path: DashboardPath) => {
		return path === s;
	};

	const logOutHandler = async () => {
		const { data } = await apiClient.get("/users/logout");
		return goto("/login");
	};

	$: isDashboardSelected = isSelected(selected, "dashboard");
	$: isCredentialsSelected = isSelected(selected, "credentials");
	$: isApplicationsSelected = isSelected(selected, "applications");
	$: isOrganizationSelected = isSelected(selected, "organization");
	$: isStaffSelected = isSelected(selected, "staff");
	$: isSettingsSelected = isSelected(selected, "settings");
</script>

<div class="side-nav">
	<div class="buttons">
		<h1>Welcome!</h1>
		<div class="hr" />
		{#await loadPromise}
			<NavButton isSelected={false} redirect="#">
				<Skeleton />
			</NavButton>
			<NavButton isSelected={false} redirect="#">
				<Skeleton />
			</NavButton>
			<NavButton isSelected={false} redirect="#">
				<Skeleton />
			</NavButton>
		{:then}
			{#if $user}
				{#if $user.isSuperUser}
					<NavButton
						label="Dashboard"
						isSelected={isDashboardSelected}
						redirect="/dashboard"
					/>
					<NavButton
						label="Credentials"
						isSelected={isCredentialsSelected}
						redirect="/dashboard/credentials"
					/>
					<NavButton
						label="Applications"
						isSelected={isApplicationsSelected}
						redirect="/dashboard/applications"
					/>
					<NavButton
						label="Organization"
						isSelected={isOrganizationSelected}
						redirect="/dashboard/organization"
					/>
					<NavButton
						label="Staff"
						isSelected={isStaffSelected}
						redirect="/dashboard/staff"
					/>
					<NavButton
						label="Settings"
						isSelected={isSettingsSelected}
						redirect="/dashboard/settings"
					/>
					<NavButton
						label="Log Out"
						isSelected={false}
						variant="secondary"
						onClick={logOutHandler}
					/>
				{:else}
					<NavButton
						label="Profile"
						isSelected={isDashboardSelected}
						redirect="/dashboard"
					/>
					<NavButton
						label="Credentials"
						isSelected={isCredentialsSelected}
						redirect="/dashboard/credentials"
					/>
					<NavButton
						label="Settings"
						isSelected={isSettingsSelected}
						redirect="/dashboard/settings"
					/>
					<NavButton
						label="Log Out"
						isSelected={false}
						variant="secondary"
						onClick={logOutHandler}
					/>
				{/if}
			{/if}
		{/await}
	</div>
	<div class="bottom">
		{#await loadPromise}
			<NavButton isSelected={false}>
				<Skeleton />
			</NavButton>
		{:then}
			{#if $user}
				{#if $user.isSuperUser}
					<NavButton
						label="Issue Credential"
						variant="highlight"
						isSelected={false}
					/>
				{:else}
					<NavButton
						label="View Registry"
						variant="highlight"
						isSelected={false}
					/>
				{/if}
			{/if}
		{/await}
	</div>
</div>
