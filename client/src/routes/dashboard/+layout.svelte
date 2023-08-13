<style lang="scss">
	.content-section {
		height: calc(100vh - 70px);
		display: flex;

		.body-content {
			padding: 40px;
			width: 100%;
			box-sizing: border-box;

			.body-slot {
				margin-top: 40px;
				width: 100%;
				height: calc(100vh - 220px);
				border-radius: 5px;
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
	import { goto, afterNavigate } from "$app/navigation";
	import { Header, SideNav } from "$lib/components/project";
	import type { DashboardPath } from "$lib/components/project/SideNav/SideNav.types";
	import { previousPath, user } from "$lib/stores";
	import type { NavigationTarget } from "@sveltejs/kit";
	import type { AxiosError } from "axios";
	import { apiClient } from "$lib/utils";
	import Skeleton from "$lib/components/ui/Skeleton/Skeleton.svelte";
	import { browser } from "$app/environment";

	let selected: DashboardPath;

	const getSelected = (to: NavigationTarget) => {
		const [_, path, slug] = to.url.pathname.split("/");
		return !slug ? (path as DashboardPath) : (slug as DashboardPath);
	};

	afterNavigate(({ from, to }) => {
		previousPath.update((p) => from?.url.pathname ?? p);
		if (!to) return;
		selected = getSelected(to);
	});

	const getUserData = async () => {
		apiClient
			.get("/users")
			.then(({ data }) => {
				user.set(data);
			})
			.catch((e: AxiosError) => {
				if (e.response && e.response?.status === 401) {
					if (browser) {
						goto("/login");
					}
				}
			});
	};

	const goBack = () => {
		goto($previousPath);
	};

	const escapeHandler = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			goBack();
		}
	};

	const loadUserData = getUserData();
</script>

<div class="header">
	<Header />
</div>
<div class="content-section">
	<SideNav bind:selected loadPromise={loadUserData} />
	<div class="body-content">
		<div class="bread-crumb">
			<div on:click={goBack} on:keydown={escapeHandler}>
				<div class="back-group">
					<img class="back-icon" src="/imgs/back-arrow.svg" alt="back" />
					{#await loadUserData}
						<Skeleton />
					{:then}
						<div class="crumb">{selected}</div>
					{/await}
				</div>
			</div>
		</div>
		<div class="body-slot">
			{#if $user}
				<slot />
			{/if}
		</div>
	</div>
</div>
