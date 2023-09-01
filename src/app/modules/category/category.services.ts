import { Category } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const createCategories = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
  });
  return result;
};

const allCategories = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany();
  return result;
};

const singleCategories = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      books: true
    }
  });
  return result;
};

const updateCategories = async (id: string, payload: Category): Promise<Category | null> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
    include: {
      books: true,
    },
  });
  return result;
};

const deleteCategories = async (
  id: string
): Promise<Category | null> => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });
  return result;
};

export const CategoriesService = {
  createCategories,
  allCategories,
  singleCategories,
  updateCategories,
  deleteCategories,
};
