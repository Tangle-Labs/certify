<style lang="scss">
</style>

<script lang="ts">
	import { Header } from "$lib/components/project";
</script>

<div class="header">
	<Header />
</div>
<div class="content-section">
	<div class="sidenav" />
	<div class="body-content">
		<slot />
	</div>
</div>
