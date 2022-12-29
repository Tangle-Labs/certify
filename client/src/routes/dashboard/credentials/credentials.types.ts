export interface ICredential {
	id: string;
	name: string;
	referenceCode: string;
	type: "ticket" | "license" | "certificate";
	duration: number;
	customFields: Record<string, unknown>;
	createdAt: Date;
	updatedAt: Date;
}
