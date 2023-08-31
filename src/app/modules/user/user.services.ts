import { User } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const createUser = async (payload: User) => {
  const result = await prisma.user.create({
    data: payload,
  });

  return result;
};



export const UserService = {
    createUser
}