import { prisma } from '@/lib/prisma';
import { GameController } from './game.controller';
import { GameRepository } from './game.repository';
import { GameService } from './game.service';

const repository = new GameRepository(prisma);
const service = new GameService(repository);

export const controller = new GameController(service);
export { GameCreateSchema, GameUpdateSchema } from './game.schema';
