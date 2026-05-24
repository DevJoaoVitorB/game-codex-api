import { ApiError } from '@/utils/api-error';
import { PlatformRepository } from './platform.repository';
import { PlatformDTO, PlatformSearchFiltersDTO } from './platform.schema';

export class PlatformService {
    constructor(private repository: PlatformRepository) {}

    async list(filters?: PlatformSearchFiltersDTO): Promise<PlatformDTO[]> {
        const hasFilters = Boolean(
            filters &&
            Object.values(filters).some((value) => value !== undefined),
        );

        if (!hasFilters) return await this.repository.findAll();

        return await this.repository.findMany(filters);
    }

    async findById(id: number): Promise<PlatformDTO> {
        const platform = await this.repository.findById(id);

        if (!platform)
            throw new ApiError('Platform not found', 404, 'NOT_FOUND');

        return platform;
    }
}
