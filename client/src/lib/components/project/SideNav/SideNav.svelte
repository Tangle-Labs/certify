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

	const isSelected = (path: DashboardPath) => {
		return path === selected;
	};
</script>

<div class="side-nav">
	<div class="buttons">
		<h1>Welcome!</h1>
		<div class="hr" />
		<NavButton
			label="Dashboard"
			isSelected={isSelected("dashboard")}
			redirect="/dashboard"
		/>
		<NavButton
			label="Credentials"
			isSelected={isSelected("credentials")}
			redirect="/dashboard/credentials"
		/>
		<NavButton
			label="Applications"
			isSelected={isSelected("applications")}
			redirect="/dashboard/applications"
		/>
		<NavButton
			label="Organization"
			isSelected={isSelected("organization")}
			redirect="/dashboard/organization"
		/>
		<NavButton
			label="Staff"
			isSelected={isSelected("staff")}
			redirect="/dashboard/staff"
		/>
		<NavButton
			label="Settings"
			isSelected={isSelected("settings")}
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
