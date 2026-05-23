import { CountryRepository } from './country.repository';
import {
    CountryDTO,
    CountryCreateDTO,
    CountryUpdateDTO,
    CountryUniqueFieldsDTO,
    CountrySearchFiltersDTO,
} from './country.schema';
import { ApiError } from '@/utils/api-error';

export class CountryService {
    constructor(private repository: CountryRepository) {}

    async create(data: CountryCreateDTO): Promise<CountryDTO> {
        const { continent, ...uniqueFields } = data;

        await this.validateUniqueFields(uniqueFields);

        return await this.repository.create(data);
    }

    async findAll(filters?: CountrySearchFiltersDTO): Promise<CountryDTO[]> {
        const hasFilters = Boolean(
            filters &&
            Object.values(filters).some((value) => value !== undefined),
        );

        if (!hasFilters) return await this.repository.findAll();

        return await this.repository.findMany(filters);
    }

    async findById(id: number): Promise<CountryDTO> {
        const country = await this.repository.findById(id);

        if (!country) throw new ApiError('Country not found', 404, 'NOT_FOUND');

        return country;
    }

    async update(
        id: number,
        data: CountryUpdateDTO,
    ): Promise<CountryDTO | null> {
        await this.findById(id);

        const { continent, ...uniqueFields } = data;

        await this.validateUniqueFields(uniqueFields, id);

        return await this.repository.update(id, data);
    }

    async remove(id: number): Promise<void> {
        await this.findById(id);

        await this.repository.remove(id);
    }

    private async validateUniqueFields(
        data: CountryUniqueFieldsDTO,
        currentId?: number,
    ): Promise<void> {
        const { name, code } = data;

        const countries = await Promise.all([
            name ? this.repository.findUnique({ name }) : null,
            code ? this.repository.findUnique({ code }) : null,
        ]);

        const existingCountry = countries.some(
            (country) => country && country.id !== currentId,
        );

        if (existingCountry)
            throw new ApiError(
                'A country with this name and/or code already exists',
                409,
                'CONFLICT',
            );
    }
}
