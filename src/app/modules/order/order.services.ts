import { OrderedBook } from '@prisma/client';
import { prisma } from '../../../shared/prisma';
import { JwtPayload } from 'jsonwebtoken';

const createOrder = async (payload: OrderedBook[], id: string) => {
  const order = await prisma.order.create({
    data: {
      userId: id,
    },
  });

  for (let i = 0; i < payload.length; i++) {
    await prisma.orderedBook.create({
      data: {
        orderId: order.id,
        bookId: payload[i].bookId,
        quantity: payload[i].quantity,
      },
    });
  }

  const result = await prisma.order.findMany({
    where: {
      id: order.id,
    },
    include: {
      orderedBooks: true,
    },
  });

  return result;
};

const allOrders = async () => {
  const result = await prisma.order.findMany({});

  return result;
};

const specificOrders = async (id: string) => {
  const result = await prisma.order.findMany({
    where: { userId: id },
  });

  return result;
};

const singleOrder = async (user: JwtPayload, id: string) => {
  if (user.role === 'customer') {
    const result = await prisma.order.findUnique({
      where: {
        userId: user.id,
        id,
      },
    });
    return result;
  }
  const result = await prisma.order.findUnique({
    where: { id },
  });
  return result;
};

export const OrderService = {
  createOrder,
  allOrders,
  specificOrders,
  singleOrder,
};
