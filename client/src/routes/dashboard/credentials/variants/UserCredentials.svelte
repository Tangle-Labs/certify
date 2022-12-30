<script lang="ts">
	import { goto } from "$app/navigation";
	import { Button } from "$lib/components/ui";
</script>

<Button
	label="New Application"
	onClick={() => goto("/dashboard/credentials/new")}
/>
