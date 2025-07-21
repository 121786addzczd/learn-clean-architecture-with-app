import { capitalize, lowerCaseFirst } from '../utils';

export function generateRouter(entityName: string) {
  const content = `
import { Router } from 'express';
import { ${capitalize(
    entityName
  )}Controller } from '../../../adapter/controllers/${lowerCaseFirst(
    entityName
  )}Controller';

const router = Router();

// Controller()の引数にuseCaseを渡すこと
const ${lowerCaseFirst(entityName)}Controller = new ${capitalize(entityName)}Controller();

// ルーティング定義サンプル
// router.post('/', ${lowerCaseFirst(entityName)}Controller.create.bind(${lowerCaseFirst(entityName)}Controller));
// router.get('/:id',  ${lowerCaseFirst(entityName)}Controller.findById.bind(${lowerCaseFirst(entityName)}Controller));

export default router;
`;
  return content.trim() + '\n';
};
