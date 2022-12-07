<script>
	import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
	import CardWithHeader from "./CardWithHeader.svelte";
</script>

<Meta title="Card With Header" component="{CardWithHeader}" />

<Template>
	<CardWithHeader header="Create DID">
		<p>
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex natus aspernatur quo esse
			eveniet. Iusto consectetur sequi recusandae, blanditiis cupiditate iure a provident culpa
			veniam vel libero, dolore quidem tempora?
		</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium ex numquam suscipit, autem
			esse qui nostrum impedit! Ipsam accusantium reprehenderit consectetur dolorem delectus hic
			fugiat, aut, ea ut incidunt sapiente!
		</p>
	</CardWithHeader>
</Template>

<Story name="Card With Header" />
