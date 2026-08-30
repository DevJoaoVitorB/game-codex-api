import { ApiError } from '@/utils/api-error';
import { GameRepository } from './game.repository';
import {
    GameCreateDTO,
    GameSearchFiltersDTO,
    GameUpdateDTO,
} from './game.schema';

export class GameService {
    constructor(private repository: GameRepository) {}

    async create(data: GameCreateDTO) {
        await this.validateData(data);
        return this.repository.create(data);
    }

    async list(filters: GameSearchFiltersDTO) {
        const hasFilters = Object.values(filters).some(
            (value) => value !== undefined,
        );
        return hasFilters
            ? this.repository.findMany(filters)
            : this.repository.findAll();
    }

    async findById(id: number) {
        const game = await this.repository.findById(id);
        if (!game) throw new ApiError('Game not found', 404, 'NOT_FOUND');
        return game;
    }

    async update(id: number, data: GameUpdateDTO) {
        await this.findById(id);
        await this.validateData(data, id);
        return this.repository.update(id, data);
    }

    async remove(id: number): Promise<void> {
        await this.findById(id);
        await this.repository.remove(id);
    }

    private async validateData(data: GameUpdateDTO, currentId?: number) {
        if (data.slug) {
            const game = await this.repository.findUnique({ slug: data.slug });
            if (game && game.id !== currentId) {
                throw new ApiError(
                    'Slug already exists',
                    409,
                    'DUPLICATE_SLUG',
                );
            }
        }

        const { studio, platforms, genres } =
            await this.repository.countRelations(
                data.studioId,
                data.platformIds,
                data.genreIds,
            );

        if (!studio)
            throw new ApiError('Studio not found', 400, 'INVALID_STUDIO');
        if (data.platformIds && platforms !== new Set(data.platformIds).size) {
            throw new ApiError('Platform not found', 400, 'INVALID_PLATFORM');
        }
        if (data.genreIds && genres !== new Set(data.genreIds).size) {
            throw new ApiError('Genre not found', 400, 'INVALID_GENRE');
        }
    }
}
