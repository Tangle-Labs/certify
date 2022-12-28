<script lang="ts">
	import { Button } from "$lib/components/ui";

	import { goto } from '$app/navigation';




	const goToLogin = () => {
		goto("/login");
	};
</script>

<h1>Welcome to SveltePress!</h1>

<Button label="login" variant="primary" onClick={goToLogin} />
