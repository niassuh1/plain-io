import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { hashPassword } from "./util/hash-password";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const email = credentials.email as string;
        const password = credentials.password as string;
        const user = await prisma.user.findFirst({
          where: { email: email },
        });

        // Check if user exists
        if (user) {
          // Check if user's password matches
          const passwordMatches = hashPassword(password) === user.password;
          if (passwordMatches) return { id: user.id, email: user.email };
        } else {
          //If user doesn't exist, create a new one
          const hashedPassword = hashPassword(password);
          const newUser = await prisma.user.create({
            data: {
              email: email,
              password: hashedPassword,
            },
          });

          return {
            id: newUser.id,
            email: newUser.email,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session(params) {
      return params;
    },
  },
});
