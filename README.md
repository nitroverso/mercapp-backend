# MercApp-Back

This is a Node.js project that uses **Express**, **TypeScript** and **Supabase** as a Backend-as-a-Service (BaaS). The project was initialized with `npm init -y` and the required dependencies were installed with the following command:

```bash
npm install express typescript @supabase/supabase-js
```

## Getting started

To start the project, follow these steps:

- Install the Node packages with a :

```bash
npm install
```

- Install the following dependencies:

```bash
npm install cors dotenv jsonwebtoken @types/express @types/jsonwebtoken express typescript @supabase/supabase-js
```

- Transpile TypeScript code:

Run the following script to transpile the TypeScript code into JavaScript:

```bash
npm run build
```

- Start the server:
  After transpiling the code, run the server with:

```bash
npm start
```

You will see A message indicating the port where the server is running will appear. By default, the application will be accessible at:

```bash
http://localhost:5000
```

Open this URL in your browser to see the output in the console.

## Folder structure

This project uses the principles of hexagonal architecture, vertical segmentation, and Screaming architecture. These approaches ensure scalability and maintainability while adhering to the best practices of clean architecture. The folder structure is shown below:

```bash
mercapp-back/
├── src/
│ ├── auth/
│ │ ├── infrastructure/
│ │ │ ├── controllers/
│ │ │ │ └── authController.ts
│ │ │ ├── middlewares/
│ │ │ │ └── authMiddleware.ts
│ │ │ └── roads/
│ │ │ └── auth.routes.ts
│ ├── products/
│ │ ├── infrastructure/
│ │ │ ├── controllers/
│ │ │ │ └── productController.ts
│ │ │ ├── repositories/
│ │ │ │ └── productRepositoryImpl.ts
│ │ │ └── routes/
│ │ │ └── products.routes.ts
│ ├── config/
│ │ └── supabase.ts
│ ├── app.ts
│ └── index.ts
├── dist/
├── node_modules/
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

To make changes, first familiarize yourself with this structure. After editing, reapply the first steps (`npm run tsc` and `npm start`) to update and restart the server.

## Supabase Integration

This project uses Supabase to simplify and improve database administration. Supabase provides a robust set of tools and resources to streamline processes such as authentication, handling real-time data, and more.

### Learn More

To dig deeper into the technologies used in this project, check out the following resources:

- [Supabase Documentation](https://supabase.com/docs): Learn more about the features and capabilities of Supabase as a BaaS.
- [Node.js Documentation](https://nodejs.org/docs/latest/api/documentation.html): Explore the official Node.js API documentation.
- [TypeScript Documentation](https://www.typescriptlang.org/docs/): Comprehensive TypeScript guides and references.
- [Express Documentation](https://expressjs.com/en/guide/routing.html): Explore Express.js features and APIs.

## Deployment

Deployment on Railway
This project can be deployed using Railway, a platform that offers a free tier for testing environments. The Hobby plan provides additional resources to scale beyond the limitations of the free plan.

For more information on Railway's pricing and plans, please see their documentation:

- [Railway Documentation](https://docs.railway.com/reference/pricing/free-trial).
