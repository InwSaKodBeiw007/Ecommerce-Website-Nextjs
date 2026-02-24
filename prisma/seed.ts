import { CanbeUse_Prisma } from '../lib/prisma';
import { categories } from '../data/categories';
import { products } from '../data/products';

async function main() {
  console.log('Start seeding safely...');

  // 1. Seed Categories
  const categoryMap: { [slug: string]: number } = {};
  for (const cat of categories) {
    const category = await CanbeUse_Prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name },
      create: { name: cat.name, slug: cat.slug },
    });
    categoryMap[cat.slug] = category.id;
  }

  // 2. Seed Products
  for (const p of products) {
    const categoryId = categoryMap[p.category];
    if (!categoryId) continue;
    await CanbeUse_Prisma.product.upsert({
      where: { id: p.id },
      update: { 
        name: p.name, 
        description: p.description, 
        price: p.price, 
        image: p.image, 
        categoryId 
      },
      create: { 
        id: p.id, 
        name: p.name, 
        description: p.description, 
        price: p.price, 
        image: p.image, 
        categoryId 
      },
    });
  }
  console.log('Seeding finished successfully!');
}

main()
  .catch(console.error)
  .finally(() => CanbeUse_Prisma.$disconnect());
