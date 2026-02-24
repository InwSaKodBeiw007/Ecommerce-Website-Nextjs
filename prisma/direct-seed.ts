import Database from "better-sqlite3";
import { categories } from '../data/categories';
import { products } from '../data/products';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'prisma/dev.db');
const db = new Database(dbPath);

async function main() {
  console.log('Start direct seeding...');

  // 1. Create Tables (Just in case)
  db.exec(`
    CREATE TABLE IF NOT EXISTS "Category" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "name" TEXT NOT NULL,
      "slug" TEXT NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS "Category_slug_key" ON "Category"("slug");

    CREATE TABLE IF NOT EXISTS "Product" (
      "id" INTEGER PRIMARY KEY,
      "name" TEXT NOT NULL,
      "description" TEXT,
      "price" REAL NOT NULL,
      "image" TEXT NOT NULL,
      "categoryId" INTEGER NOT NULL,
      FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
    );
  `);

  // 2. Seed Categories
  const categoryMap: { [slug: string]: number } = {};
  const insertCategory = db.prepare('INSERT OR IGNORE INTO "Category" (name, slug) VALUES (?, ?)');
  const getCategory = db.prepare('SELECT id FROM "Category" WHERE slug = ?');

  for (const cat of categories) {
    insertCategory.run(cat.name, cat.slug);
    const row = getCategory.get(cat.slug) as { id: number };
    categoryMap[cat.slug] = row.id;
  }

  // 3. Seed Products
  const insertProduct = db.prepare('INSERT OR REPLACE INTO "Product" (id, name, description, price, image, categoryId) VALUES (?, ?, ?, ?, ?, ?)');

  for (const p of products) {
    const categoryId = categoryMap[p.category];
    if (!categoryId) continue;
    insertProduct.run(p.id, p.name, p.description, p.price, p.image, categoryId);
  }

  console.log('Direct seeding finished successfully!');
}

main().catch(console.error);
