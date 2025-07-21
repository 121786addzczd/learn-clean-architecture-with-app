import inquirer from 'inquirer';
import path from 'path';
import { lowerCaseFirst, writeFile } from './utils';
import { generateEntity, generateRepositoryInterface } from './templates/entityLayer';

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
    console.log('UseCase');
  } else if (layer === 'Interface adapter') {
    console.log('Interface adapter');
  } else if (layer === 'Frameworks & driver') {
    console.log('Frameworks & driver');
  } else {
    console.error('不正な選択です。');
  }
}

main();
