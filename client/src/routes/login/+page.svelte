<style lang="scss">
	.container {
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;

		.card {
			width: 600px;

			.error {
				background: var(--error-background);
				margin: 10px 30px;
				padding: 20px;
				border-radius: 5px;
			}

			.qr {
				display: flex;
				justify-content: center;
			}

			.text-block,
			.button-block {
				padding: 10px 30px;
			}

			.button-block {
				padding-top: 25px;
			}

			p {
				width: 100%;
				text-align: center;
				margin-top: 20px;
			}
		}
	}
</style>

<script lang="ts">
	import { CardWithHeader } from "$lib/components/project";
	import { Input, Button, Qr } from "$lib/components/ui";
	import { apiClient } from "$lib/utils";
	import { onMount } from "svelte";

	let email: string;
	let password: string;
	let error: string | null;
	let loginWithEmail = false;
	let qr: string;

	onMount(async () => {
		const { data } = await apiClient.get("/oid4vc/siop");
		qr = data.uri;
	});

	const onClick = async () => {
		if (email && password) {
			error = null;
			const { data } = await apiClient
				.post("/users/login", { email, password })
				.then(() => {
					window.location.pathname = "/dashboard";
				})
				.catch((e) => (error = e.response.data.error.message));
		} else {
			error = "Email and Password are required!";
		}
	};
</script>

<div class="container">
	<div class="card">
		<CardWithHeader header="Login">
			{#if error}
				<div class="error">{error}</div>
			{/if}
			{#if loginWithEmail}
				<div class="text-block">
					<Input
						label="Email Address"
						bind:value={email}
						placeholder="severus@hogwarts.edu"
						variant="email"
					/>
				</div>
				<div class="text-block">
					<Input
						label="Password"
						bind:value={password}
						variant="password"
						placeholder="password"
					/>
				</div>
				<div class="button-block">
					<Button {onClick} label="Login" size="large" />

					<p>Need an account? <a href="/register">Register</a> instead</p>
					<p>
						<a href="#" on:click={() => (loginWithEmail = false)}
							>Login with DID</a
						> instead
					</p>
				</div>
			{:else}
				{#if qr}
					<div class="qr">
						<Qr data={qr} />
					</div>
				{/if}
				<div class="button-block">
					<p>
						<a href="#" on:click={() => (loginWithEmail = true)}
							>Login with Email</a
						> instead
					</p>
				</div>
			{/if}
		</CardWithHeader>
	</div>
</div>
