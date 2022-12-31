import { default as Axios } from "axios";
import { BASE_URL } from "$lib/config/config";

export const apiClient = Axios.create({
	baseURL: BASE_URL,
	withCredentials: true
});
