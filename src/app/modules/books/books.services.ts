/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import {
  booksRelationalFields,
  booksRelationalFieldsMapper,
  booksSearchableFields,
} from './books.constant';
import { IBooksFilterRequest } from './books.interface';

const createBooks = async (payload: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data: payload,
    include: {
      category: true,
    },
  });
  return result;
};

const allBooks = async (
  filters: IBooksFilterRequest,
  options: IPaginationOptions,
) => {
  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);


  const andConditions = [];

  // Convert minPrice and maxPrice to numbers
  const parsedMinPrice = minPrice ? parseFloat(minPrice) : undefined;
  const parsedMaxPrice = maxPrice ? parseFloat(maxPrice) : undefined;

  if (parsedMinPrice !== undefined) {
    andConditions.push({
      price: {
        gte: parsedMinPrice,
      },
    });
  }

  if (parsedMaxPrice !== undefined) {
    andConditions.push({
      price: {
        lte: parsedMaxPrice,
      },
    });
  }

  if (searchTerm) {
    andConditions.push({
      OR: booksSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => {
        if (booksRelationalFields.includes(key)) {
          return {
            [booksRelationalFieldsMapper[key]]: {
              id: (filtersData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filtersData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            publicationDate: 'desc',
          },
  });

  const total = await prisma.book.count();
  const totalPage = Math.ceil(total / limit)

  return {
    meta: {
      total,
      page,
      limit,
      totalPage,
    },
    data: result,
  };
};

const categoriesBooks = async (id: string) => {
  const result = await prisma.book.findMany({
    where: {
      categoryId: id,
    },
  });

  return result;
};

const singleBooks = async (id: string) => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateBooks = async (id: string, payload: Partial<Book>) => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
    include: {
      category: true,
    },
  });

  return result;
};

const deleteBooks = async (id: string) => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });

  return result;
};

export const BooksServices = {
  createBooks,
  allBooks,
  categoriesBooks,
  singleBooks,
  updateBooks,
  deleteBooks,
};
