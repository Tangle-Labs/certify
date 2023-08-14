<style lang="scss">
	.page-body {
		display: flex;
		width: 100%;

		.card-container {
			width: 65%;
			margin-right: 40px;

			h1 {
				padding: 30px;
			}
		}

		.cards {
			display: flex;
			width: 100%;
			gap: 20px;
			margin-bottom: 20px;
			box-sizing: border-box;
			height: calc(20vh + 30px);

			.dash-card {
				width: 33.33%;
				height: 20vh;

				.dash-card-body {
					box-sizing: border-box;
					height: 20vh;
					padding: 30px;
					position: relative;

					.content {
						position: absolute;
						top: 30%;
						left: 30%;
					}

					.count {
						padding: 0;
						font-size: 3rem;
						font-weight: 400;
					}

					.info {
						font-weight: 600;
						font-size: 1.2rem;
						margin-top: 10px;
					}
				}
			}
		}

		.application-card {
			width: 35%;
		}
	}
</style>

<script lang="ts">
	import { apiClient } from "$lib/utils";
	import type { IApplication, IUserStats } from "$lib/types";
	import ApplicationTable from "./applications/application-components/ApplicationTable.svelte";
	import ApplicationCard from "./applications/application-components/ApplicationCard.svelte";
	import { Card, Skeleton } from "$lib/components/ui";
	import type { IAdminStats } from "$lib/types";
	import { user } from "$lib/stores";

	let applications: IApplication[];
	let adminStats: IAdminStats;
	let userStats: IUserStats;
	let selected: IApplication;

	async function loadPage() {
		const { data: applicationsData } = await apiClient.get(
			$user.isSuperUser ? "/admin/applications" : "/applications"
		);
		applications = applicationsData;
		if ($user.isSuperUser) {
			const { data: adminStatsData } = await apiClient.get("/admin/stats");
			adminStats = adminStatsData;
		} else {
			const { data: userStatsData } = await apiClient.get("/stats");
			userStats = userStatsData;
		}
	}

	const load = loadPage();
</script>

<div class="page-body">
	<div class="card-container">
		<div class="cards">
			<div class="dash-card">
				<Card>
					<div class="dash-card-body">
						<div class="content">
							{#await load}
								<div class="count">
									<Skeleton height={20} width={50} />
								</div>
								<div class="info">
									<Skeleton width={150} />
								</div>
							{:then}
								<h1 class="count">
									{$user.isSuperUser ? adminStats.users : userStats.pending}
								</h1>
								<div class="info">
									{$user.isSuperUser ? "Unique Users" : "Pending"}
								</div>
							{/await}
						</div>
					</div>
				</Card>
			</div>

			<div class="dash-card">
				<Card>
					<div class="dash-card-body">
						<div class="content">
							{#await load}
								<div class="count">
									<Skeleton height={20} width={50} />
								</div>
								<div class="info">
									<Skeleton width={150} />
								</div>
							{:then}
								<h1 class="count">
									{$user.isSuperUser
										? adminStats.credentials
										: userStats.approved}
								</h1>
								<div class="info">
									{$user.isSuperUser ? "Credentials" : "Approved"}
								</div>
							{/await}
						</div>
					</div>
				</Card>
			</div>

			<div class="dash-card">
				<Card>
					<div class="dash-card-body">
						<div class="content">
							{#await load}
								<div class="count">
									<Skeleton height={20} width={50} />
								</div>
								<div class="info">
									<Skeleton width={150} />
								</div>
							{:then}
								<h1 class="count">
									{$user.isSuperUser
										? adminStats.applications
										: userStats.rejected}
								</h1>
								<div class="info">
									{$user.isSuperUser ? "Applications" : "Rejected"}
								</div>
							{/await}
						</div>
					</div>
				</Card>
			</div>
		</div>
		<Card noBorder={true}>
			<h1>Applications</h1>
		</Card>
		<ApplicationTable {applications} bind:selected {load} />
	</div>

	<div class="application-card">
		<ApplicationCard
			{selected}
			variant={$user.isSuperUser ? "admin" : "user"}
			{loadPage} />
	</div>
</div>
