import { Category } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const createCategories = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
  });
  return result;
};

const allCategories = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany({});
  return result;
};

export const CategoriesService = {
  createCategories,
  allCategories,
};
