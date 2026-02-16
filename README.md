# 🚀 Prisma + PostgreSQL Setup Guide

A complete step‑by‑step guide to setting up **Prisma ORM with PostgreSQL and Node.js**.

This guide covers:

* Project initialization
* Prisma installation
* PostgreSQL connection
* Database migration
* Prisma Client usage
* Prisma Studio GUI

---

# 📁 Project Structure

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

# 🧱 Step 1 — Create Project Folder

```bash
mkdir prisma-setup
cd prisma-setup
```

---

# 📦 Step 2 — Initialize Node.js Project

```bash
npm init -y
```

Creates:

```
package.json
```

---

# 📥 Step 3 — Install Required Packages

```bash
npm install prisma @prisma/client @prisma/adapter-pg pg dotenv
```

---

# ⚙️ Step 4 — Initialize Prisma

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

# 🔗 Step 5 — Configure PostgreSQL Connection

Edit `.env`

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/mydb"
```

---

# 🧠 Step 6 — Configure prisma.config.ts

Edit `prisma.config.ts`

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

# 🗄️ Step 7 — Configure schema.prisma

Edit `prisma/schema.prisma`

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

---

# ⚡ Step 8 — Generate Prisma Client

```bash
npx prisma generate
```

---

# 🧬 Step 9 — Run Migration

```bash
npx prisma migrate dev --name init
```

Creates database tables.

---

# 📂 Step 10 — Create src Folder

```bash
mkdir src
```

---

# 🔌 Step 11 — Create Database Connection File

Windows:

```bash
type nul > src\db.js
```

Linux/Mac:

```bash
touch src/db.js
```

---

# ▶️ Step 12 — Create Main File

Windows:

```bash
type nul > src\index.js
```

Linux/Mac:

```bash
touch src/index.js
```

---

# 🧩 Step 13 — Enable ES Modules

Edit `package.json`

```json
{
  "type": "module"
}
```

---

# ▶️ Step 14 — Run Project

```bash
node src/index.js
```

---

# 🖥️ Step 15 — Open Prisma Studio (Database GUI)

```bash
npx prisma studio
```

Opens browser interface.

---

# 🛠️ Useful Prisma Commands

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

---

# ✅ Requirements

* Node.js 18+
* PostgreSQL 14+
* npm or yarn

---

# 📚 Technologies Used

* Node.js
* Prisma ORM
* PostgreSQL
* dotenv

---

# 🎯 Result

You now have:

* Prisma connected to PostgreSQL
* Working Prisma Client
* Database migrations enabled
* GUI database manager

---

# 🧑‍💻 Author

Setup guide for Prisma + PostgreSQL production‑ready backend.

---

# ⭐ Support

If this helped you, give the repository a ⭐ on GitHub.

---
