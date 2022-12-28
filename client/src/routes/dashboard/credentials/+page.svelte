<script lang="ts">
	import { goto } from "$app/navigation";
    import { Button } from "$lib/components/ui"

    function onClick() {
        goto("/dashboard/credentials/new")
    }
</script>
<h1>Credentials</h1>
<Button {onClick} variant="secondary" label="New Credential" />