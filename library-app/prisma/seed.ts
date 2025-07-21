import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

async function readJSON<T>(fileName: string): Promise<T> {
  const filePath = path.join(__dirname, 'seed', fileName);
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}

async function main() {
  // JSON読み込み
  const book = await readJSON<{ id: string; title: string; isAvailable: boolean }[]>('book.json');
  const user = await readJSON<{ id: string; email: string }[]>('user.json');
  const rental = await readJSON<{ id: string; bookId: string;  userId: string; dueDate: Date }[]>('rental.json');

  // データ挿入
  await prisma.book.createMany({ data: book });
  await prisma.user.createMany({ data: user });
  await prisma.rental.createMany({ data: rental });

  console.log('Seed data inserted');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
