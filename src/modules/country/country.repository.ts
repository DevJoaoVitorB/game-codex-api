import { Prisma, PrismaClient } from '@prisma-client';
import {
    CountryDTO,
    CountryCreateDTO,
    CountryUpdateDTO,
    CountrySearchFiltersDTO,
} from './country.schema';

export class CountryRepository {
    constructor(private prisma: PrismaClient) {}

    async create(data: CountryCreateDTO): Promise<CountryDTO> {
        return this.prisma.country.create({ data });
    }

    async findAll(): Promise<CountryDTO[]> {
        return this.prisma.country.findMany();
    }

    async findMany(filters?: CountrySearchFiltersDTO): Promise<CountryDTO[]> {
        return await this.prisma.country.findMany({ where: filters });
    }

    async findById(id: number): Promise<CountryDTO | null> {
        return this.prisma.country.findUnique({ where: { id } });
    }

    async findUnique(
        where: Prisma.CountryWhereUniqueInput,
    ): Promise<CountryDTO | null> {
        return this.prisma.country.findUnique({ where });
    }

    async update(
        id: number,
        data: CountryUpdateDTO,
    ): Promise<CountryDTO | null> {
        return await this.prisma.country.update({
            where: { id },
            data,
        });
    }

    async remove(id: number): Promise<CountryDTO> {
        return this.prisma.country.delete({ where: { id } });
    }
}
