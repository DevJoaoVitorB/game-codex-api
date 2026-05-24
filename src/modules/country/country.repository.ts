import { PrismaClient } from '@prisma-client';
import { CountryDTO, CountrySearchFiltersDTO } from './country.schema';

export class CountryRepository {
    constructor(private prisma: PrismaClient) {}

    async findAll(): Promise<CountryDTO[]> {
        return this.prisma.country.findMany();
    }

    async findMany(filters?: CountrySearchFiltersDTO): Promise<CountryDTO[]> {
        return this.prisma.country.findMany({
            where: filters?.continent?.length
                ? { continent: { in: filters?.continent } }
                : undefined,
        });
    }

    async findById(id: number): Promise<CountryDTO | null> {
        return this.prisma.country.findUnique({ where: { id } });
    }
}
