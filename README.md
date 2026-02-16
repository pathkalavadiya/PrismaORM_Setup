# 🚀 Prisma + PostgreSQL Setup Guide

<p align="center">
  <img src="https://miro.medium.com/0*VRlI0n8V_zvnoKpB.jpg" width="180" alt="Prisma Logo" />
</p>

<p align="center">
  <b>Production‑ready Prisma ORM setup with PostgreSQL and Node.js</b>
</p>

---

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-green" />
  <img src="https://img.shields.io/badge/Prisma-ORM-blue" />
  <img src="https://img.shields.io/badge/PostgreSQL-14+-blue" />
  <img src="https://img.shields.io/badge/License-MIT-green" />
</p>

---

# 📖 Overview

This guide walks you through setting up:

* Prisma ORM
* PostgreSQL database
* Node.js backend
* Prisma Client
* Prisma Studio GUI
* Migration system

This setup is suitable for:

* Backend APIs
* Production systems
* Microservices
* Full‑stack apps

---

# 📁 Final Project Structure

```
prisma-setup/
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── db.js
│   └── index.js
│
├── .env
├── package.json
└── prisma.config.ts
```

---

# ⚙️ Step‑by‑Step Installation

---

## 🧱 Step 1 — Create Project Folder

```bash
mkdir prisma-setup
cd prisma-setup
```

---

## 📦 Step 2 — Initialize Node.js

```bash
npm init -y
```

Creates:

```
package.json
```

---

## 📥 Step 3 — Install Dependencies

```bash
npm install prisma @prisma/client @prisma/adapter-pg pg dotenv
```

### 📌 Package explanation

| Package            | Purpose                |
| ------------------ | ---------------------- |
| prisma             | Prisma CLI             |
| @prisma/client     | Prisma database client |
| pg                 | PostgreSQL driver      |
| dotenv             | Environment variables  |
| @prisma/adapter-pg | PostgreSQL adapter     |

---

## ⚙️ Step 4 — Initialize Prisma

```bash
npx prisma init
```

Creates:

```
prisma/
.env
prisma.config.ts
```

---

## 🔗 Step 5 — Configure Database Connection

Edit `.env`

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/mydb"
```

### 📌 Format

```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

Example:

```
postgresql://postgres:1234@localhost:5432/prisma_db
```

---

## 🧠 Step 6 — Configure Prisma Config

Edit:

```
prisma.config.ts
```

```ts
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",

  datasource: {
    url: process.env.DATABASE_URL,
  },
});
```

---

## 🗄️ Step 7 — Define Database Schema

Edit:

```
prisma/schema.prisma
```

```prisma
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
```

### 📌 Model explanation

| Field     | Description    |
| --------- | -------------- |
| id        | Primary key    |
| name      | User name      |
| email     | Unique email   |
| createdAt | Auto timestamp |

---

## ⚡ Step 8 — Generate Prisma Client

```bash
npx prisma generate
```

Generates:

```
node_modules/@prisma/client
```

---

## 🧬 Step 9 — Run Migration

```bash
npx prisma migrate dev --name init
```

Creates:

* Database tables
* Migration files

---

## 📂 Step 10 — Create Source Folder

```bash
mkdir src
```

---

## 🔌 Step 11 — Create Database Connection File

Windows:

```bash
type nul > src\db.js
```

Linux/Mac:

```bash
touch src/db.js
```

Paste:

```js
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
})

export default prisma
```

---

## ▶️ Step 12 — Create Main File

Windows:

```bash
type nul > src\index.js
```

Linux/Mac:

```bash
touch src/index.js
```

Paste:

```js
import prisma from './db.js'

async function main() {

  // Insert multiple users
  const result = await prisma.user.createMany({

    data: [
      {
        name: "Path",
        email: "path@example.com",
      },
      {
        name: "John",
        email: "john@example.com",
      },
      {
        name: "Alice",
        email: "alice@example.com",
      },
      {
        name: "Bob",
        email: "bob@example.com",
      }
    ],

    skipDuplicates: true
  })

  console.log("Inserted count:", result.count)

  // Fetch all users
  const users = await prisma.user.findMany()

  console.log("All users:", users)
}

main()
.catch(console.error)
.finally(async () => {
  await prisma.$disconnect()
})
```

---

## 🧩 Step 13 — Enable ES Modules

Edit:

```
package.json
```

Add:

```json
{
  "type": "module"
}
```

---

## ▶️ Step 14 — Run Application

```bash
node src/index.js
```

Output:

```
User created: {...}
All users: [...]
```

---

## 🖥️ Step 15 — Open Prisma Studio

```bash
npx prisma studio
```

Features:

* View data
* Edit data
* Delete data
* Database GUI

---

# 🛠️ Essential Prisma Commands

## Generate Client

```bash
npx prisma generate
```

## Run Migration

```bash
npx prisma migrate dev
```

## Reset Database

```bash
npx prisma migrate reset
```

## Open Prisma Studio

```bash
npx prisma studio
```

## View Migration Status

```bash
npx prisma migrate status
```

---

# 🔥 Common Prisma Operations

## Create Record

```js
await prisma.user.create({
  data: {
    name: "Alice",
    email: "alice@email.com"
  }
});
```

## Read Records

```js
await prisma.user.findMany();
```

## Update Record

```js
await prisma.user.update({
  where: { id: 1 },
  data: { name: "Updated" }
});
```

## Delete Record

```js
await prisma.user.delete({
  where: { id: 1 }
});
```

---

# ⚡ Performance Best Practices

* Use single PrismaClient instance
* Avoid creating multiple connections
* Use indexes for search fields
* Use migrations
* Use environment variables

---

# 🔒 Production Best Practices

* Never commit .env
* Use connection pooling
* Use Docker
* Use migrations
* Enable logging

---

# 📦 Requirements

| Requirement | Version |
| ----------- | ------- |
| Node.js     | 18+     |
| PostgreSQL  | 14+     |
| npm         | latest  |

---

# 🎯 Result

After setup, you will have:

✅ PostgreSQL connected
✅ Prisma working
✅ Migration system ready
✅ Database GUI ready
✅ Production‑ready setup

---

# 👨‍💻 Author

Backend Prisma Setup Guide

---

# ⭐ Support

If this helped you:

Give this repository a ⭐ on GitHub

---
