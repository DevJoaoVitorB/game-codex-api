import { prisma } from '@/lib/prisma';
import { GameStudioRepository } from './game-studio.repository';
import { GameStudioService } from './game-studio.service';
import { GameStudioController } from './game-studio.controller';

export * from './game-studio.schema';

export const repository = new GameStudioRepository(prisma);
export const service = new GameStudioService(repository);
export const controller = new GameStudioController(service);
