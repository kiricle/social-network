import { PrismaClient } from '@prisma/client';

let prisma = new PrismaClient();

declare global {
    var __prisma: PrismaClient | undefined;
}

if (!global.__prisma) {
    global.__prisma = prisma;
}

prisma = global.__prisma;

export default prisma;