// connection to the database using prisma

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = 
    globalForPrisma.prisma ?? 
    new PrismaClient({
        log: ['query'], // log queries for debugging
    })


// prevent too many connections
if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
}