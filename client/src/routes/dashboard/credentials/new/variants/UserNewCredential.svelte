<style lang="scss">
	.page-body {
		.credentials-card {
			padding: 20px;

			h3 {
				color: var(--label-text);
			}

			.application-card {
				padding: 15px;
				border-radius: 30px;
				background: var(--alt-background);
				display: flex;
				margin: 20px 0;
				user-select: none;
				transition: 0.4s all;
				box-sizing: border-box;
				border: 2px solid var(--alt-background);

				.cred-thumbnail {
					width: 80px;
					height: 80px;
					background-color: var(--table-header);
					border-radius: 40px;
					position: relative;
					user-select: none;

					.text {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						padding: 0;
						margin: 0;
						font-size: 2rem;
						font-weight: 900;
					}
				}

				.cred-text {
					margin-left: 30px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					align-content: center;
					width: 100%;

					.cred-meta {
						h2 {
							display: flex;
							padding-bottom: 5px;

							flex-wrap: wrap;
						}

						p {
							color: var(--label-text);
						}
					}

					.cred-button {
						width: 300px;
						flex-basis: 300px;
					}

					& > * {
						flex-basis: 100%;
					}
				}

				&:hover {
					cursor: pointer;
					border: 2px solid var(--primary);
				}
			}
		}
	}
</style>

<script lang="ts">
	import { Card, Button, Skeleton } from "$lib/components/ui";
	import { CardWithHeader } from "$lib/components/project";
	import { apiClient, secondsToStr } from "$lib/utils";
	import type { ICredential } from "../../credentials.types";
	import { goto } from "$app/navigation";

	let credentials: ICredential[] = [];

	const getCredentials = async () => {
		const { data } = await apiClient.get("/credentials");
		credentials = data;
	};

	const loadCredentials = getCredentials();
</script>

<div class="page-body">
	<Card>
		<div class="credentials-card">
			<h3>Choose Credential</h3>
			{#await loadCredentials}
				<div class="application-card">
					<div class="cred-thumbnail">
						<Skeleton variant="circle" width={80} height={80} />
					</div>
					<div class="cred-text">
						<div>
							<Skeleton variant="bar" width={300} />
						</div>

						<div>
							<Skeleton variant="bar" width={150} />
						</div>
					</div>
				</div>
			{:then}
				{#each credentials as cred (cred.id)}
					<div class="application-card">
						<div class="cred-thumbnail">
							<div class="text">
								{cred.name[0]}
							</div>
						</div>
						<div class="cred-text">
							<div class="cred-meta">
								<h2>
									{cred.name}
								</h2>
								<p>{cred.type} - {secondsToStr(cred.duration)}</p>
							</div>
							<div class="cred-button">
								<Button
									label="Apply Credential >"
									variant="tertiary"
									onClick={() => goto(`/dashboard/credentials/new/${cred.id}`)}
								/>
							</div>
						</div>
					</div>
				{/each}
			{/await}
		</div>
	</Card>
	<div class="preview-card" />
</div>
