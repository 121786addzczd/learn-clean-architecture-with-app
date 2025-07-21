/**
 * exportData.ts
 *
 * データベースの内容をJSON形式で出力するスクリプト。
 *
 * 実行コマンド:
 *   npm run export:data
 *
 * 出力先:
 *   - prisma/seed/user.json
 *   - prisma/seed/book.json
 *   - prisma/seed/rental.json
 */
import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';

const prisma = new PrismaClient();

async function exportData() {
  const users = await prisma.user.findMany();
  const books = await prisma.book.findMany();
  const rentals = await prisma.rental.findMany();

  await fs.mkdir('prisma/seed', { recursive: true });

  await fs.writeFile('prisma/seed/user.json', JSON.stringify(users, null, 2));
  await fs.writeFile('prisma/seed/book.json', JSON.stringify(books, null, 2));
  await fs.writeFile('prisma/seed/rental.json', JSON.stringify(rentals, null, 2));

  console.log('Exported data to prisma/seed/*.json');
}

exportData()
  .catch((e) => {
    console.error('Export error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
