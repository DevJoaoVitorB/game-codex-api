import { PrismaClient } from '@prisma-client';
import { PlatformDTO, PlatformSearchFiltersDTO } from './platform.schema';

export class PlatformRepository {
    constructor(private prisma: PrismaClient) {}

    async findAll(): Promise<PlatformDTO[]> {
        return this.prisma.platform.findMany();
    }

    async findMany(
        filters?: PlatformSearchFiltersDTO,
    ): Promise<PlatformDTO[]> {
        return this.prisma.platform.findMany({
            where: filters?.type?.length
                ? { type: { in: filters?.type } }
                : undefined,
        });
    }

    async findById(id: number): Promise<PlatformDTO | null> {
        return this.prisma.platform.findUnique({ where: { id } });
    }
}
