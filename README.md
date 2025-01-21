# MercApp-Back

This is a Node.js project using **Express**, **TypeScript**, and **Supabase** as a Backend-as-a-Service (BaaS). The project was initialized with `npm init -y` and the required dependencies were installed with the following command:

```bash
npm install express typescript @supabase/supabase-js
```

## First Steps

To start the project, follow these steps:

- 1. Transpile TypeScript Code:

Run the following script to transpile the TypeScript code into JavaScript:

```bash
npm run tsc
```

- 2. Start the Server:
     After transpiling the code, run the server with:

```bash
npm start
```

A message will appear indicating the port where the server is running. By default, the application will be accessible at:

```bash
http://localhost:5000
```

Open this URL in your browser to see the output in the console.

## Folder Structure

This project uses Hexagonal Architecture, Vertical Slicing, and Screaming Architecture principles. These approaches ensure scalability and maintainability while adhering to the best practices of clean architecture. Below is the folder structure:

```bash
mercapp-back/
├── src/
│   ├── auth/
│   │   ├── infrastructure/
│   │   │   ├── controllers/
│   │   │   │   └── authController.ts
│   │   │   ├── middlewares/
│   │   │   │   └── authMiddleware.ts
│   │   │   └── routes/
│   │   │       └── auth.routes.ts
│   ├── products/
│   │   ├── infrastructure/
│   │   │   ├── controllers/
│   │   │   │   └── productController.ts
│   │   │   ├── repositories/
│   │   │   │   └── productRepositoryImpl.ts
│   │   │   └── routes/
│   │   │       └── products.routes.ts
│   ├── config/
│   │   └── supabase.ts
│   ├── app.ts
│   └── index.ts
├── dist/
├── node_modules/
├── package.json
├── tsconfig.json
└── README.md
```

To make changes, first familiarize yourself with this structure. After editing, reapply the first steps (`npm run tsc` and `npm start`) to update and restart the server.

## Supabase Integration

This project uses Supabase to simplify and enhance database management. Supabase provides a robust set of tools and resources to streamline processes such as authentication, real-time data handling, and more.

### Learn More

To dive deeper into the technologies used in this project, check out the following resources:

- [Supabase Documentation](https://supabase.com/docs): Learn more about Supabase's features and capabilities as a BaaS.
- [Node.js Documentation](https://nodejs.org/docs/latest/api/documentation.html): Explore the official Node.js API documentation.
- [TypeScript Documentation](https://www.typescriptlang.org/docs/): Comprehensive TypeScript guides and references.
- [Express Documentation](https://expressjs.com/en/guide/routing.html): Explore Express.js's features and APIs.

## Deployment

Implementation on Railway
This project can be deployed using Railway, a platform offering a free tier for testing environments. The Hobby Plan provides additional resources for scaling beyond the free plan's limitations.

For more information about Railway's pricing and plans, refer to their documentation:

- [Railway Documentation](https://docs.railway.com/reference/pricing/free-trial).
