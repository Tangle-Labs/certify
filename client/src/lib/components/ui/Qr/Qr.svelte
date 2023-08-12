<style>
	.qr {
		padding: 10px 0;
	}
</style>

<script lang="ts">
	import { LibLoader } from "$lib/components/ui";

	export let data: string;
	export let size = 250;
	export let bgColor = "#2e2e2e";
	export let fgColor = "#f9f9f9";
	let qr: HTMLElement;
	function onLoaded() {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore

		/* eslint-disable-line */ const qrCode = new QRCodeStyling({
			width: size,
			height: size,
			type: "svg",
			data: data,
			dotsOptions: {
				color: fgColor,
				type: "dots"
			},
			backgroundOptions: {
				color: bgColor
			}
		});

		qrCode.append(qr);
	}
</script>

<div class="qr">
	<LibLoader
		url={"https://unpkg.com/qr-code-styling@1.5.0/lib/qr-code-styling.js"}
		on:loaded={onLoaded}
	/>
	<div class="qr" bind:this={qr} />
</div>
