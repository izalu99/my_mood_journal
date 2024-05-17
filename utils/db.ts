// connection to the database using prisma

import { PrismaClient, Prisma } from '@prisma/client'


// create a global object to store the prisma client
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

// create a new prisma client if it doesn't exist
export const prisma = 
    globalForPrisma.prisma ?? 
    new PrismaClient({
        log: [{
            emit: 'event',
            level: 'query',
        }],
    })

//define a function to sanitize prisma queries
function sanitizeQuery(query: string | never): string {
    // replace any sensitive information in the query string with '*****'
    return query.replace(/(password|token|refreshToken|authorization)/gi, '*****');
}


// event listener for the 'query' event
prisma.$on('query', (e: any) => {
    const event = e as Prisma.QueryEvent;
    const { query } = event;
    const safeQuery = sanitizeQuery(query as string);
    console.log(`Query: ${safeQuery}`);


// prevent too many connections
if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
}