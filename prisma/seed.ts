import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma-client';
import { countries } from '@prisma/data/countries.seed';

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

try {
    // SEED: Insert 197 Countries in Database
    await prisma.country.createMany({ data: countries, skipDuplicates: true });
} finally {
    await prisma.$disconnect();
}
