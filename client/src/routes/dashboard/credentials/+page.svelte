<script lang="ts">
	import { user } from "$lib/stores";
	import AdminCredentials from "./variants/AdminCredentials.svelte";
	import UserCredentials from "./variants/UserCredentials.svelte";
</script>

{#if $user.isSuperUser}
	<AdminCredentials />
{:else}
	<UserCredentials />
{/if}
