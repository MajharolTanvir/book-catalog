import { prisma } from "../../../shared/prisma";


const userProfile = async (id: string) => {
  console.log(id);
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};


export const UserProfileService = {
    userProfile
} 
