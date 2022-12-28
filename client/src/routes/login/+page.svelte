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
	import { axios } from "$lib/utils/axios.utils";

	let email: string;
	let password: string;
	let error: string | null;

	const onClick = async () => {
		if (email && password) {
			error = null;
			const { data } = await axios
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
			</div>
		</CardWithHeader>
	</div>
</div>
