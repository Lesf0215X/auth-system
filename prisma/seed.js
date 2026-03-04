require('dotenv').config()

const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({
  adapter,
})

async function main() {
  const hashedPassword = await bcrypt.hash('Admin123', 10)

  await prisma.user.upsert({
    where: { email: 'admin@system.com' },
    update: {},
    create: {
      email: 'admin@system.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('Admin user created')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())