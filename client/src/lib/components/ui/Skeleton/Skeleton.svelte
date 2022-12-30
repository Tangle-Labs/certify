<script lang="ts">
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	import Skeleton from "svelte-skeleton/Skeleton.svelte";
	export let width = 150;
	export let height = 10;
	export let speed = 2;
	export let variant: "bar" | "circle" = "bar";
</script>

<Skeleton
	{width}
	{height}
	secondaryColor="#4d4d4d"
	primaryColor="#3d3d3d"
	animate={true}
	{speed}
>
	{#if variant === "bar"}
		<rect {width} {height} x="0" y="0" rx="5" ry="5" />
	{:else if variant === "circle"}
		<rect {width} {height} x="0" y="0" rx={width / 2} ry={height / 2} />
	{/if}
</Skeleton>
