import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "certify",
			version: "v0.1.0"
		},
		components: {
			securitySchemas: {
				cookieAuth: {
					type: "apiKey",
					in: "cookie",
					name: "connect.sid"
				}
			}
		},
		security: [
			{
				cookieAuth: []
			}
		]
	},
	apis: ["./src/routers/*.ts", "./src/validators/*.ts"]
};

export const swaggerSpecification = swaggerJsdoc(swaggerOptions);
