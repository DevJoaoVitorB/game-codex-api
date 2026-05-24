import { PrismaClient } from '@prisma-client';
import { GenreDTO } from './genre.schema';

export class GenreRepository {
    constructor(private prisma: PrismaClient) {}

    async findAll(): Promise<GenreDTO[]> {
        return this.prisma.genre.findMany();
    }

    async findById(id: number): Promise<GenreDTO | null> {
        return this.prisma.genre.findUnique({ where: { id } });
    }
}
