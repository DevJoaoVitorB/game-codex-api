import { Prisma, PrismaClient } from '@prisma-client';
import {
    GameStudioCreateDTO,
    GameStudioDTO,
    GameStudioSearchFiltersDTO,
    GameStudioUpdateDTO,
} from './game-studio.schema';

export class GameStudioRepository {
    constructor(private prisma: PrismaClient) {}

    async create(data: GameStudioCreateDTO): Promise<GameStudioDTO> {
        return this.prisma.gameStudio.create({ data });
    }

    async update(
        id: number,
        data: GameStudioUpdateDTO,
    ): Promise<GameStudioDTO> {
        return this.prisma.gameStudio.update({ where: { id }, data });
    }

    async remove(id: number): Promise<void> {
        await this.prisma.gameStudio.delete({ where: { id } });
    }

    async findAll(): Promise<GameStudioDTO[]> {
        return this.prisma.gameStudio.findMany();
    }

    async findMany(
        filters?: GameStudioSearchFiltersDTO,
    ): Promise<GameStudioDTO[]> {
        return this.prisma.gameStudio.findMany({
            where: {
                foundedYear: filters?.foundedYear?.length
                    ? { in: filters.foundedYear }
                    : undefined,
                countryId: filters?.countryId?.length
                    ? { in: filters.countryId }
                    : undefined,
            },
        });
    }

    async findById(id: number): Promise<Prisma.GameStudioGetPayload<{
        include: { games: true };
    }> | null> {
        return this.prisma.gameStudio.findUnique({
            where: { id },
            include: { games: true },
        });
    }

    async findUnique(where: Prisma.GameStudioWhereUniqueInput) {
        return this.prisma.gameStudio.findUnique({ where });
    }

    async findCountry(id: number) {
        return this.prisma.country.findUnique({
            where: { id },
            select: { id: true },
        });
    }
}
