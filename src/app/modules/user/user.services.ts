import { User } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const createUser = async (payload: User) => {
  const result = await prisma.user.create({
    data: payload,
  });

  return result;
};

const allUser = async () => {
  const result = await prisma.user.findMany({});
  return result;
};

const singleUser = async (id: string) => {
    const result = await prisma.user.findUnique({
        where: {
          id
      }
  });
  return result;
};

const updateUser = async (id: string, payload: Partial<User>) => {
  const result = await prisma.user.update({
    where: {
      id,
      },
      data: payload
  });
  return result;
};

const deleteUser = async (id: string) => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const UserService = {
  createUser,
  allUser,
  singleUser,
  updateUser,
  deleteUser,
};
