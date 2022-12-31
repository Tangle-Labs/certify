<script lang="ts">
	import { user } from "$lib/stores";
	import AdminNewCredential from "./variants/AdminNewCredential.svelte";
	import UserNewCredential from "./variants/UserNewCredential.svelte";
</script>

{#if $user.isSuperUser}
	<AdminNewCredential />
{:else}
	<UserNewCredential />
{/if}
