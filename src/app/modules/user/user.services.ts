import { User } from '@prisma/client';
import { prisma } from '../../../shared/prisma';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const createUser = async (payload: User) => {
  const result = await prisma.user.create({
    data: payload,
  });

  const isUserExist = await prisma.user.findFirst({
    where: {
      id: result.id,
    },
  });

  if (isUserExist) {
    const { id, role } = isUserExist;
    const accessToken = jwtHelpers.createToken(
      { id, role },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string,
    );

    const refreshToken = jwtHelpers.createToken(
      { id, role },
      config.jwt.refresh_secret as Secret,
      config.jwt.refresh_expires_in as string,
    );

    return {
      accessToken,
      refreshToken,
    };
  } else {
    throw new Error('User does not exist');
  }
};

const allUser = async () => {
  const result = await prisma.user.findMany({});
  return result;
};

const singleUser = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateUser = async (id: string, payload: Partial<User>) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
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
