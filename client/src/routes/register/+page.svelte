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
	import { Input, Button } from "$lib/components/ui";
	import { apiClient } from "$lib/utils";

	let name: string;
	let email: string;
	let password: string;
	let confirmPassword: string;
	let error: string | null;

	const onClick = async () => {
		if (email && name && password && confirmPassword) {
			if (password === confirmPassword) {
				error = null;
				await apiClient
					.post("/users", { name, email, password })
					.then(() => {
						window.location.pathname = "/login";
					})
					.catch((e) => {
						error = e.response.data.error.message;
					});
			} else {
				error = "Passwords do not match!";
			}
		} else {
			error = "All the fields are required!";
		}
	};
</script>

<div class="container">
	<div class="card">
		<CardWithHeader header="Register">
			{#if error}
				<div class="error">{error}</div>
			{/if}

			<div class="text-block">
				<Input label="Username" bind:value={name} placeholder="username" />
			</div>

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
			<div class="text-block">
				<Input
					label="Confirm Password"
					bind:value={confirmPassword}
					variant="password"
					placeholder="confirm password"
				/>
			</div>
			<div class="button-block">
				<Button {onClick} label="Register" size="large" />

				<p>Already a user, <a href="/login">Login</a> instead</p>
			</div>
		</CardWithHeader>
	</div>
</div>
