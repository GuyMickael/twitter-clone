import { type User } from "@clerk/nextjs/dist/api";
import clerkClient from "@clerk/nextjs/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    name: user.username,
    image: user.profileImageUrl,
  };
}

export const postRouter = createTRPCRouter({
  // Get all posts
  getAll: publicProcedure.query(async ({ ctx }) => {
    // First we get all posts
    const posts = await ctx.prisma.post.findMany({
      take: 100,
    });

    // Then we get all users to fetch their image and name
    const userList = ( 
      await clerkClient.clerkClient.users.getUserList({
        userId: posts.map((post) => post.authorId),
        limit: 100,})
    ).map(filterUserForClient);

    return posts.map((post) => ({
      post,
      author: userList.find((user) => user.id === post.authorId),  
    }));

  }),
});
