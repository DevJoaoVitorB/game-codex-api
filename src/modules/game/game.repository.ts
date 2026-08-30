import { Prisma, PrismaClient } from '@prisma-client';
import {
    GameCreateDTO,
    GameSearchFiltersDTO,
    GameUpdateDTO,
} from './game.schema';

const gameInclude = {
    studio: true,
    platforms: true,
    genres: true,
} satisfies Prisma.GameInclude;

export class GameRepository {
    constructor(private prisma: PrismaClient) {}

    async create(data: GameCreateDTO) {
        const { platformIds, genreIds, specs, ...game } = data;

        return this.prisma.game.create({
            data: {
                ...game,
                specs: specs === null ? Prisma.JsonNull : specs,
                platforms: { connect: platformIds.map((id) => ({ id })) },
                genres: { connect: genreIds.map((id) => ({ id })) },
            },
            include: gameInclude,
        });
    }

    async update(id: number, data: GameUpdateDTO) {
        const { platformIds, genreIds, specs, ...game } = data;

        return this.prisma.game.update({
            where: { id },
            data: {
                ...game,
                specs:
                    specs === undefined
                        ? undefined
                        : specs === null
                          ? Prisma.JsonNull
                          : specs,
                platforms: platformIds
                    ? {
                          set: platformIds.map((platformId) => ({
                              id: platformId,
                          })),
                      }
                    : undefined,
                genres: genreIds
                    ? { set: genreIds.map((genreId) => ({ id: genreId })) }
                    : undefined,
            },
            include: gameInclude,
        });
    }

    async remove(id: number): Promise<void> {
        await this.prisma.game.delete({ where: { id } });
    }

    async findAll() {
        return this.prisma.game.findMany({ include: gameInclude });
    }

    async findMany(filters: GameSearchFiltersDTO) {
        const normalizedName = filters.name?.replaceAll('-', ' ');
        const studioNames = filters.studio?.map((studio) =>
            studio.replaceAll('-', ' '),
        );

        return this.prisma.game.findMany({
            where: {
                OR: filters.name
                    ? [
                          {
                              slug: {
                                  contains: filters.name,
                                  mode: 'insensitive',
                              },
                          },
                          {
                              name: {
                                  contains: normalizedName,
                                  mode: 'insensitive',
                              },
                          },
                      ]
                    : undefined,
                classification: filters.classification?.length
                    ? { in: filters.classification }
                    : undefined,
                releaseDate: filters.releaseDate?.length
                    ? { in: filters.releaseDate }
                    : undefined,
                studio: studioNames?.length
                    ? { name: { in: studioNames, mode: 'insensitive' } }
                    : undefined,
                genres: filters.genre?.length
                    ? {
                          some: {
                              slug: { in: filters.genre, mode: 'insensitive' },
                          },
                      }
                    : undefined,
                platforms:
                    filters.platform?.length || filters.type?.length
                        ? {
                              some: {
                                  slug: filters.platform?.length
                                      ? {
                                            in: filters.platform,
                                            mode: 'insensitive',
                                        }
                                      : undefined,
                                  type: filters.type?.length
                                      ? { in: filters.type }
                                      : undefined,
                              },
                          }
                        : undefined,
            },
            include: gameInclude,
            orderBy: { name: 'asc' },
        });
    }

    async findById(id: number) {
        return this.prisma.game.findUnique({
            where: { id },
            include: gameInclude,
        });
    }

    async findUnique(where: Prisma.GameWhereUniqueInput) {
        return this.prisma.game.findUnique({ where });
    }

    async countRelations(
        studioId?: number,
        platformIds?: number[],
        genreIds?: number[],
    ) {
        const [studio, platforms, genres] = await Promise.all([
            studioId
                ? this.prisma.gameStudio.count({ where: { id: studioId } })
                : Promise.resolve(1),
            platformIds
                ? this.prisma.platform.count({
                      where: { id: { in: platformIds } },
                  })
                : undefined,
            genreIds
                ? this.prisma.genre.count({ where: { id: { in: genreIds } } })
                : undefined,
        ]);

        return { studio, platforms, genres };
    }
}
