import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
})

async function main() {

  // ✅ Insert multiple users
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

    skipDuplicates: true, // avoids error if email already exists
  })

  console.log("Inserted count:", result.count)

  // ✅ Fetch all users
  const users = await prisma.user.findMany()


  console.log("All users:", users)
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })
