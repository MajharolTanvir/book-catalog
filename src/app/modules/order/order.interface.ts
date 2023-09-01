import { OrderStatus } from '@prisma/client';

export type IOrderWithOrderedBook = {
  status: OrderStatus;
  bookId: string[];
  quantity: number;
};
