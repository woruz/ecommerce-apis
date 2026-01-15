const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "E-Commerce API",
      version: "1.0.0",
      description: `
Professional E-Commerce Backend API.

Features:
- JWT Authentication
- Role-based access (Admin / Customer)
- Products, Cart & Orders
- Pagination & filtering
`,
      contact: {
        name: "Backend Developer",
        email: "your-email@example.com",
      },
    },

    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Local development server",
      },
    ],

    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        ErrorResponse: {
          type: "object",
          properties: {
            status: { type: "string", example: "error" },
            message: { type: "string" },
            errors: { type: "object", nullable: true },
          },
        },

        SuccessResponse: {
          type: "object",
          properties: {
            status: { type: "string", example: "success" },
            message: { type: "string" },
            data: { type: "object" },
          },
        },
      },
    },

    security: [{ BearerAuth: [] }],
  },

  apis: [
    path.join(__dirname, "paths/*.js"),
  ],
};

module.exports = swaggerJsdoc(options);
