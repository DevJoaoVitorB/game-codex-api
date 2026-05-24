import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma-client';
import { countries } from '@prisma/data/countries.seed';
import { genres } from '@prisma/data/genres.seed';
import { platforms } from '@prisma/data/platforms.seed';

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

try {
    // SEED: Insert 197 Countries in Database
    await prisma.country.createMany({ data: countries, skipDuplicates: true });

    // SEED: Insert 43 Genres in Database
    await prisma.genre.createMany({ data: genres, skipDuplicates: true });

    // SEED: Insert 35 Platforms in Database
    await prisma.platform.createMany({
        data: platforms,
        skipDuplicates: true,
    });
} finally {
    await prisma.$disconnect();
}
