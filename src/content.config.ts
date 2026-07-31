import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx,json}', base: "./src/content/products" }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['blocks', 'paving', 'curbs']),
    price: z.string().default('По запросу'),
    dimensions: z.object({
      length: z.number(), // длина в мм
      width: z.number(),  // ширина в мм
      height: z.number(), // высота в мм
    }),
    strength: z.string(), // Марка прочности, например "М-50 / М-75 / М-100"
    frostResistance: z.string(), // Морозостойкость, например "F-50"
    weight: z.number().optional(), // Вес в кг
    thermalConductivity: z.number().optional(), // Теплопроводность
    description: z.string(),
    seoTitle: z.string(),
    seoDescription: z.string(),
    image: z.string(), // Путь к изображению товара
  }),
});

export const collections = { products };
