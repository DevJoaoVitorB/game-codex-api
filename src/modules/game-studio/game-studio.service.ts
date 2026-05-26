import { ApiError } from '@/utils/api-error';
import { GameStudioRepository } from './game-studio.repository';
import {
    GameStudioCreateDTO,
    GameStudioDTO,
    GameStudioSearchFiltersDTO,
    GameStudioUpdateDTO,
} from './game-studio.schema';

export class GameStudioService {
    constructor(private repository: GameStudioRepository) {}

    async create(data: GameStudioCreateDTO): Promise<GameStudioDTO> {
        const { foundedYear, ...fieldsToValidate } = data;

        await this.validateFields(fieldsToValidate);

        return await this.repository.create(data);
    }

    async list(filters?: GameStudioSearchFiltersDTO): Promise<GameStudioDTO[]> {
        const hasFilters = Boolean(
            filters &&
            Object.values(filters).some((value) => value !== undefined),
        );

        if (!hasFilters) return await this.repository.findAll();

        return await this.repository.findMany(filters);
    }

    async findById(id: number) {
        const studio = await this.repository.findById(id);

        if (!studio) throw new ApiError('Studio not found', 404, 'NOT_FOUND');

        return studio;
    }

    async update(
        id: number,
        data: GameStudioUpdateDTO,
    ): Promise<GameStudioDTO> {
        await this.findById(id);

        const { foundedYear, ...fieldsToValidate } = data;

        await this.validateFields(fieldsToValidate, id);

        return this.repository.update(id, data);
    }

    async remove(id: number): Promise<void> {
        await this.findById(id);

        await this.repository.remove(id);
    }

    private async validateFields(
        fields: { name?: string; website?: string | null; countryId?: number },
        currentId?: number,
    ): Promise<void> {
        const { name, website, countryId } = fields;

        const [nameMatch, websiteMatch] = await Promise.all([
            name ? this.repository.findUnique({ name }) : null,
            website ? this.repository.findUnique({ website }) : null,
        ]);

        if (nameMatch && nameMatch.id !== currentId)
            throw new ApiError('Name already exists', 409, 'DUPLICATE_NAME');

        if (websiteMatch && websiteMatch.id !== currentId)
            throw new ApiError(
                'Website already exists',
                409,
                'DUPLICATE_WEBSITE',
            );

        if (countryId) this.ensureCountryExists(countryId);
    }

    private async ensureCountryExists(countryId: number): Promise<void> {
        const exists = await this.repository.findCountry(countryId);

        if (!exists) {
            throw new ApiError('Country not found', 400, 'INVALID_COUNTRY');
        }
    }
}
