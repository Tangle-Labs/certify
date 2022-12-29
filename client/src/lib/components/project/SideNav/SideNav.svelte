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
	import { NavButton } from "$lib/components/project";
	import type { DashboardPath } from "./SideNav.types";

	export let selected: DashboardPath;

	const isSelected = (s: DashboardPath, path: DashboardPath) => {
		return path === s;
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
	</div>
	<div class="bottom">
		<NavButton
			label="Issue Credential"
			variant="highlight"
			isSelected={false}
		/>
	</div>
</div>
