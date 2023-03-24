import { type User } from "@clerk/nextjs/dist/api";
import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    name: user.username,
    image: user.profileImageUrl,
    email: user.emailAddresses[0]?.emailAddress,
    lastname : user.lastName,
    firstname : user.firstName,
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
      await clerkClient.users.getUserList({
        userId: posts.map((post) => post.authorId),
        limit: 100,})
    ).map(filterUserForClient);

    return posts.map((post) => {
      const author = userList.find((user) => user.id === post.authorId);
      if (!author) throw new TRPCError({code: "INTERNAL_SERVER_ERROR", message: "Author not found"});
      return {
        post,
        author,
      }
    });
  }),
});
