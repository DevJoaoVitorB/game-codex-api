import { prisma } from '@/lib/prisma';
import { GenreRepository } from './genre.repository';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';

export * from './genre.schema';

export const repository = new GenreRepository(prisma);
export const service = new GenreService(repository);
export const controller = new GenreController(service);
