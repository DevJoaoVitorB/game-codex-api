import { CountryRepository } from './country.repository';
import { CountryDTO, CountrySearchFiltersDTO } from './country.schema';
import { ApiError } from '@/utils/api-error';

export class CountryService {
    constructor(private repository: CountryRepository) {}

    async list(filters?: CountrySearchFiltersDTO): Promise<CountryDTO[]> {
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
}
