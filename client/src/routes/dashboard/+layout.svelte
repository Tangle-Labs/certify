<style lang="scss">
	.content-section {
		height: calc(100vh - 70px);
		display: flex;

		.body-content {
			padding: 40px;
			width: 100%;
			box-sizing: border-box;

			.body-slot {
				padding-top: 40px;
				width: 100%;
				height: calc(100vh - 220px);
				overflow: hidden;
			}

			.bread-crumb {
				width: 100%;

				.back-group {
					display: flex;
					justify-content: center;
					align-items: center;
					width: fit-content;

					.back-icon {
						height: 2.2rem;
					}

					.crumb {
						color: white;
						text-transform: capitalize;
						font-weight: bold;
						font-size: 1.85rem;
						padding-left: 10px;
						transform: translateY(2px);
					}

					&:hover {
						cursor: pointer;
					}
				}
			}
		}
	}
</style>

<script lang="ts">
	import { navigating } from "$app/stores";
	import { Header, SideNav } from "$lib/components/project";
	import type { DashboardPath } from "$lib/components/project/SideNav/SideNav.types";
	import type { Navigation } from "@sveltejs/kit";

	let selected: DashboardPath = "dashboard";

	const watchSelected = (navigating: Navigation | null) => {
		if (!(navigating && navigating.to)) return;
		const [_, path, slug] = navigating.to.url.pathname.split("/");
		selected = !slug ? (path as DashboardPath) : (slug as DashboardPath);
	};

	$: watchSelected($navigating);
</script>

<div class="header">
	<Header />
</div>
<div class="content-section">
	<SideNav bind:selected />
	<div class="body-content">
		<div class="bread-crumb">
			<a href="/dashboard">
				<div class="back-group">
					<img class="back-icon" src="/imgs/back-arrow.svg" alt="back" />
					<div class="crumb">{selected}</div>
				</div>
			</a>
		</div>
		<div class="body-slot">
			<slot />
		</div>
	</div>
</div>
