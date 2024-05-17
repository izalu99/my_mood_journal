// connection to the database using prisma

import { PrismaClient} from '@prisma/client'


// create a global object to store the prisma client
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

// create a new prisma client if it doesn't exist
export const prisma = 
    globalForPrisma.prisma ?? 
    new PrismaClient({
        log: ['query'],
    })


// prevent too many connections
if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
}

export default prisma;