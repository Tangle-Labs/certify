<script lang="ts">
	import { goto } from "$app/navigation";
	import { Button } from "$lib/components/ui";

	function goToNewCredentialsPage() {
		goto("/dashboard/credentials/new");
	}
</script>

<Button onClick={goToNewCredentialsPage} variant="secondary" label="New Credential" />
