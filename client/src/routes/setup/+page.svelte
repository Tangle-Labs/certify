<style lang="scss">
	.container {
		width: 100%;
		height: 100vh;
		padding: 0;
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.error {
		margin: 10px 15%;
		padding: 15px;
		background: var(--error-background);
		border-radius: 5px;
		transform: translateY(20px);
	}

	.step-container {
		width: 600px;

		.form {
			width: 70%;
			padding: 30px 15%;

			.back {
				text-align: center;
				font-weight: bold;
				font-size: 1.225rem;
				transition: all 0.4s;
				transform: translateY(-10px);
				color: var(--alt-background);

				&:hover {
					cursor: pointer;
					color: var(--label-text);
				}
			}
		}
	}

	@media only screen and (max-width: 800px) {
		.step-container {
			width: 80vw;
		}
	}
</style>

<script lang="ts">
	import { CardWithHeader } from "$lib/components/project";
	import { axios } from "$lib/utils/axios.utils";
	import Step1 from "./steps/step1.svelte";
	import Step2 from "./steps/step2.svelte";
	import Step3 from "./steps/step3.svelte";

	const stepHeaders: Record<number, string> = {
		1: "Create Organization",
		2: "Create Password",
		3: "Creating Identity",
		4: "Continue to Login"
	};

	let step = 1;
	let error: string | null = null;
	let orgName: string;
	let orgEmail: string;
	let confirmEmail: string;
	let password: string;
	let confirmPassword: string;
	let didInfo: Record<string, any>;
	let isDisabled = true;

	const stepOneHandler = () => {
		if (orgEmail && orgName && confirmEmail) {
			if (orgEmail === confirmEmail) {
				error = null;
				step++;
			} else {
				error = "Error: Emails do not match!";
			}
		} else {
			error = "Error: Please fill all fields!";
		}
	};

	const stepTwoHandler = async () => {
		if (password && password === confirmPassword) {
			step++;
			const { data } = await axios.post("/admin/setup", {
				orgName,
				orgEmail,
				password
			});
			didInfo = data;
			isDisabled = false;
		} else {
			error = "Error: Passwords must match!";
		}
	};

	const stepThreeHandler = async () => {
		window.location.href = "/login";
	};
</script>

<div class="container">
	<div class="step-container">
		<CardWithHeader header={stepHeaders[step]}>
			{#if error}
				<div class="error">
					{error}
				</div>
			{/if}
			<div class="form">
				{#if step === 1}
					<Step1
						bind:orgName
						bind:orgEmail
						bind:confirmEmail
						stepHandler={stepOneHandler}
					/>
				{:else if step === 2}
					<Step2
						bind:password
						bind:confirmPassword
						stepHandler={stepTwoHandler}
					/>
				{:else if step === 3}
					<Step3 {didInfo} bind:isDisabled stepHandler={stepThreeHandler} />
				{/if}
				{#if step === 2}
					<div class="back-block">
						<div
							class="back"
							on:click={() => {
								step--;
							}}
						>
							Back
						</div>
					</div>
				{/if}
			</div>
		</CardWithHeader>
	</div>
</div>
