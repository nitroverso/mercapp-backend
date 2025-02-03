import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mercapp API",
      version: "1.0.0",
      description: "Mercapp API with autogenerated swagger doc",
      contact: {
        name: "Developers Backend",
        email: "mercappbackend@gmail.com",
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Local server",
        },
      ],
    },
  },
  apis: ["./src/**/*.routes.ts"],
};

const specs = swaggerJSDoc(options);

export default specs;
