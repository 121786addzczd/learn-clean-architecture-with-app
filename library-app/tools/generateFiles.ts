import inquirer from 'inquirer';
import path from 'path';
import { capitalize, lowerCaseFirst, writeFile } from './utils';
import { generateEntity, generateRepositoryInterface } from './templates/entityLayer';
import { generateUseCase, generateUseCaseInterface, generateRequestDto, generateResponseDto } from './templates/useCaseLayer';
import { generateController, generatePrismaRepository } from './templates/adapterLayer';
import { generateRouter } from './templates/infrastructureLayer';

async function generateEntityLayer() {
  const { entityName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'entityName',
      message: 'エンティティの名前を入力してください:',
    }
  ]);

  const basePath = path.join(__dirname, '..', 'src', 'domain');

  const entityContent = generateEntity(entityName);
  writeFile(path.join(basePath, 'entities', `${lowerCaseFirst(entityName)}.ts`), entityContent);

  const RepositoryInterfaceContent = generateRepositoryInterface(entityName);
  writeFile(
    path.join(
      basePath,
      'repositories',
      `${lowerCaseFirst(entityName)}RepositoryInterface.ts`
    ),
    RepositoryInterfaceContent
  );
}

async function generateUseCaseLayer() {
  const { entityName, useCaseName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'entityName',
      message: 'エンティティの名前を入力してください:',
    },
    {
      type: 'input',
      name: 'useCaseName',
      message: 'ユースケースの名前を入力してください:',
    }
  ]);

  const basePath = path.join(__dirname, '..', 'src', 'application');

  const useCaseInterfaceContent = generateUseCaseInterface(entityName, useCaseName);
  writeFile(
    path.join(
      basePath,
      'useCases',
      `${entityName}`,
      `${lowerCaseFirst(useCaseName)}UseCaseInterface.ts`
    ),
    useCaseInterfaceContent
  );

  const useCaseContent = generateUseCase(entityName, useCaseName);
  writeFile(
    path.join(
      basePath,
      'useCases',
      `${entityName}`,
      `${lowerCaseFirst(useCaseName)}UseCase.ts`
    ),
    useCaseContent
  );

  const requestDtoContent = generateRequestDto(useCaseName);
  writeFile(
    path.join(
      basePath,
      'dtos',
      `${entityName}`,
      `${lowerCaseFirst(useCaseName)}RequestDto.ts`
    ),
    requestDtoContent
  );

  const responseDtoContent = generateResponseDto(useCaseName);
  writeFile(
    path.join(
      basePath,
      'dtos',
      `${entityName}`,
      `${lowerCaseFirst(useCaseName)}ResponseDto.ts`
    ),
    responseDtoContent
  );

}

async function generateInterfaceAdapterLayer() {
  const { entityName, useCaseName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'entityName',
      message: 'エンティティの名前を入力してください:',
    },
    {
      type: 'input',
      name: 'useCaseName',
      message: 'ユースケースの名前を入力してください:',
    }
  ]);

  const basePath = path.join(__dirname, '..', 'src', 'adapter');

  const controllerContent = generateController(entityName, useCaseName);
  writeFile(
    path.join(
      basePath,
      'controllers',
      `${lowerCaseFirst(entityName)}Controller.ts`
    ),
    controllerContent
  );

  const repositoryContent = generatePrismaRepository(entityName);
  writeFile(
    path.join(
      basePath,
      'repositories',
      `prisma${capitalize(entityName)}Repository.ts`
    ),
    repositoryContent
  );
}

async function generateInfrastructureLayer() {
  const { entityName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'entityName',
      message: 'エンティティの名前を入力してください:',
    }
  ]);

  const basePath = path.join(__dirname, '..', 'src', 'infrastructure');
  const routerContent = generateRouter(entityName);
  writeFile(path.join(basePath, 'web', 'routers', `${lowerCaseFirst(entityName)}Router.ts`), routerContent);
}

async function main() {
  const layers = [
    'Entity',
    'UseCase',
    'Interface adapter',
    'Frameworks & driver',
  ] as const;

  type Layer = (typeof layers)[number];

  const { layer }: { layer: Layer } = await inquirer.prompt([
    {
      type: 'list',
      name: 'layer',
      message: 'どの層のファイルを生成しますか？',
      choices: layers,
    },
  ]);

  if (layer === 'Entity') {
    await generateEntityLayer();
  } else if (layer === 'UseCase') {
    await generateUseCaseLayer();
  } else if (layer === 'Interface adapter') {
    await generateInterfaceAdapterLayer();
  } else if (layer === 'Frameworks & driver') {
    await generateInfrastructureLayer();
  } else {
    console.error('不正な選択です。');
  }
}

main();
