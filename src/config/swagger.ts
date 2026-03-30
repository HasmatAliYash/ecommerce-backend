import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { Express } from "express";

export const setupSwagger = (app: Express) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "E-COMMERCE REST API",
        version: "1.0.0",
        description: "REST API for a shopping platform",
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],

      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },

    apis: ["src/modules/**/*.ts"],
  };

  const swaggerSpec = swaggerJsdoc(options);

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
