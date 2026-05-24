import { ApiError } from '@/utils/api-error';
import { GenreRepository } from './genre.repository';
import { GenreDTO } from './genre.schema';

export class GenreService {
    constructor(private repository: GenreRepository) {}

    async list(): Promise<GenreDTO[]> {
        return this.repository.findAll();
    }

    async findById(id: number): Promise<GenreDTO> {
        const genre = await this.repository.findById(id);

        if (!genre) throw new ApiError('Genre not found', 404, 'NOT_FOUND');

        return genre;
    }
}
