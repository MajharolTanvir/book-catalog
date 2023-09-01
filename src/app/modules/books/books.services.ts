/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book } from '@prisma/client';
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
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  console.log(searchTerm);

  const andConditions = [];

    
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

  const result = await prisma.book.findMany({
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
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

export const BooksServices = {
  createBooks,
  allBooks,
};
