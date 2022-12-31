<style lang="scss">
	.page-body {
		width: 100%;
		display: flex;

		.users-table {
			width: 65%;
			margin-right: 40px;
		}

		.sidebar {
			width: 35%;
		}
	}
</style>

<script lang="ts">
	import type { IUser } from "$lib/types";
	import { apiClient } from "$lib/utils";
	import StaffTable from "./staff-components/StaffTable.svelte";
	import StaffCard from "./staff-components/StaffCard.svelte";

	let users: IUser[];
	let selected: IUser;

	const getStaff = async () => {
		const { data } = await apiClient.get("/staff");
		users = data;
	};

	let email: string;
	let roleId: string;
	let name: string;

	const setSelected = (user: IUser) => {
		selected = user;
		email = user.email;
		roleId = (user.Role && user.Role.id) ?? "";
		name = user.name;
	};

	const load = getStaff();
</script>

<div class="page-body">
	<div class="users-table">
		<StaffTable {load} {users} {setSelected} />
	</div>
	<div class="sidebar">
		<StaffCard {selected} {email} {roleId} {name} />
	</div>
</div>
