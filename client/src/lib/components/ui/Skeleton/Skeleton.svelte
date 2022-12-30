<script lang="ts">
	import Skeleton from "svelte-skeleton/Skeleton.svelte";
	export let width = 150;
	export let height = 10;
	export let speed = 2;
	export let variant: "bar" | "image" = "bar";
</script>

{#if variant === "bar"}
	<Skeleton
		{width}
		{height}
		secondaryColor="#4d4d4d"
		primaryColor="#3d3d3d"
		animate={true}
		{speed}
	>
		<rect {width} {height} x="0" y="0" rx="5" ry="5" />
	</Skeleton>
{/if}
