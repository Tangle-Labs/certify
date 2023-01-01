<script lang="ts">
	import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
	import Button from "../Button/Button.svelte";
	import Modal from "./Modal.svelte";

	let isOpen = false;
</script>

<Meta title="Modal" component={Modal} />

<Template>
	<Button label="show modal" onClick={() => (isOpen = false)} />
	<Modal {isOpen} header="A Very Normal Title">
		<div class="modal-body">
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur
				assumenda totam dolores doloribus. Suscipit, deleniti! Error, sequi
				ducimus doloremque, dignissimos animi maxime sed sint quibusdam
				obcaecati quidem praesentium molestias odio.
			</p>
			<p>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus eum,
				at veritatis magnam ipsa corporis assumenda facere doloremque. Odio
				porro corporis a? Porro saepe dolorum praesentium magnam assumenda
				consequuntur. Dolore?
			</p>
		</div>
		<Button label="Okay Bro 👍🏻" onClick={() => (isOpen = false)} />
	</Modal>
</Template>

<Story name="Modal" />
