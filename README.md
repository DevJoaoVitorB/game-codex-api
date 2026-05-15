<div align="center">
    <img src="./.github/assets/express.png" alt="Express.js Logo" width="600"/>
</div>

<br>

<h1 align="center"><strong>EXPRESS BOILERPLATE - FASTCODE EDITION</strong></h1>
<p align="center">Don’t start your next <strong>Node.js API</strong> from scratch.<br>
A clean, scalable <strong>Express + TypeScript</strong> boilerplate built for real-world projects.</p>

<br>

<div align="center">
    <img src="https://img.shields.io/badge/Node.js->=%2024-339933?logo=node.js&logoColor=white" alt="Node.js Logo"/>
    <img src="https://img.shields.io/badge/TypeScript->=%206-3178C6?logo=typescript&logoColor=white" alt="TypeScript Logo"/>
    <img src="https://img.shields.io/badge/Express->=%205-000000?logo=express&logoColor=white" alt="Express.js Logo" />
</div>

## 🚀 Technologies

This boilerplate is built with a modern Node.js backend stack focused on scalability, clean architecture, and developer experience.

### 📦 Dependencies

#### 🔹 Core

- `TypeScript` → Static typing for scalable development
- `tsx` → Run TypeScript directly with fast reload
- `Express` → Minimal and flexible web framework

#### 🔹 Database

- `Prisma` → Type-safe ORM for database access
- `PostgreSQL (pg)` → Database driver
- `@prisma/client` → Prisma runtime client
- `@prisma/adapter-pg` → Prisma PostgreSQL adapter

#### 🔹 Validation & Config

- `Zod` → Runtime schema validation with type inference
- `dotenv` → Environment variable management

#### 🔹 Networking

- `cors` → Cross-origin resource sharing

### 📄 Project Structure

- `.gitignore` → Ignore unnecessary files (node_modules, dist, etc.)
- `.env.example` → Example environment configuration
- `tsconfig.json` → TypeScript compiler configuration
- `prisma/schema.prisma` → Database schema and models
- `prisma.config.ts` → Prisma configuration
- `src/` → Application source code (routes, services, controllers, etc.)

### ⚡ Scripts

```bash
# Development (hot reload)
npm run start:dev

# Build project
npm run build

# Run production build
npm run start:build

# Prisma (setup inicial)
npm run prisma:init

# Prisma Studio (database GUI)
npm run prisma:studio
```

### 🔐 Environment Variables

Create a `.env` file in the root:

```env
# Server
HOST="0.0.0.0"
PORT=3000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/db"
```

- Always provide a `.env.example` with placeholder values for reference
- Prisma depends on `DATABASE_URL` to connect to the database

### 👨‍💻 How To Use

```bash
# Clone repository
git clone https://github.com/DevJoaoVitorB/express-boilerplate.git

cd express-boilerplate

# Install dependencies
npm install

# Setup env
cp .env.example .env

# Run prisma
npm run prisma:init

# Start dev server
npm run start:dev
```

### Author

|           [<img src="https://avatars.githubusercontent.com/u/182047578?s=100&v=4"><br><sub>João Vitor B. S.</sub>](https://github.com/DevJoaoVitorB)            |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [![Email](https://skillicons.dev/icons?i=gmail)](mailto:devjoaovitorb.s@gmail.com) [![LinkedIn](https://skillicons.dev/icons?i=linkedin)](https://www.linkedin.com/in/devjoaovitorb)  |
