STEP 1 — Create project folder

Open terminal and run:

mkdir prisma-setup
cd prisma-setup


This creates:

prisma-setup/

STEP 2 — Initialize Node.js project

Command:

npm init -y


Creates:

package.json


Example:

{
  "name": "prisma-setup",
  "version": "1.0.0"
}

STEP 3 — Install required packages

Command:

npm install prisma @prisma/client @prisma/adapter-pg pg dotenv

What each package does
Package	Purpose
prisma	Prisma CLI
@prisma/client	Prisma ORM client
@prisma/adapter-pg	PostgreSQL adapter
pg	PostgreSQL driver
dotenv	Loads .env variables
STEP 4 — Initialize Prisma

Command:

npx prisma init


Creates:

prisma/
.env
prisma.config.ts


Project now:

prisma-setup/
│
├─ prisma/
├─ .env
├─ prisma.config.ts
├─ package.json

STEP 5 — Configure PostgreSQL connection

Open .env

Put your database URL:

DATABASE_URL="postgresql://postgres:password@localhost:5432/mydb"


Example:

DATABASE_URL="postgresql://postgres:rootpath@localhost:5432/mydb"

STEP 6 — Configure prisma.config.ts

Open:

prisma.config.ts


Replace with:

import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",

  datasource: {
    url: process.env.DATABASE_URL,
  },
});


This tells Prisma where database is.

STEP 7 — Configure schema.prisma

Open:

prisma/schema.prisma


Put this:

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
}


This defines User table.

STEP 8 — Generate Prisma Client

Command:

npx prisma generate


Creates Prisma client in:

node_modules/@prisma/client

STEP 9 — Run migration (create database tables)

Command:

npx prisma migrate dev --name init


Creates:

prisma/migrations/


and creates User table in PostgreSQL.

STEP 10 — Create src folder

Command:

mkdir src


Creates:

src/

STEP 11 — Create database connection file

Create file:

src/db.js


Code:

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

export default prisma;


This connects Prisma to PostgreSQL.

STEP 12 — Create main file

Create:

src/index.js


Code:

import prisma from "./db.js";

async function main() {

  const user = await prisma.user.create({
    data: {
      name: "Path",
      email: "path@example.com"
    }
  });

  console.log("Created user:", user);

  const users = await prisma.user.findMany();

  console.log("All users:", users);

}

main()
.catch(console.error)
.finally(() => prisma.$disconnect());

STEP 13 — Enable ES modules

Open:

package.json


Add:

"type": "module"


Final example:

{
  "name": "prisma-setup",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node src/index.js"
  }
}

STEP 14 — Run project

Command:

node src/index.js


Output example:

Created user: { id: 1, name: 'Path', email: 'path@example.com' }
All users: [...]

FINAL PROJECT STRUCTURE
prisma-setup/
│
├─ prisma/
│   ├─ schema.prisma
│   └─ migrations/
│
├─ src/
│   ├─ db.js
│   └─ index.js
│
├─ .env
├─ prisma.config.ts
├─ package.json

Useful Prisma Commands

Generate client:

npx prisma generate


Migration:

npx prisma migrate dev


Reset database:

npx prisma migrate reset


Open GUI:

npx prisma studio
