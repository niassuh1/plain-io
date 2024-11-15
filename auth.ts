import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { hashPassword } from "./util/hash-password";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await prisma.user.findFirst({ where: { email: email } });
        const hashedPassword = hashPassword(password);
        // Check if user exits
        if (user) {
          if (user.password === hashedPassword) {
            return { email: user.email, id: user.id };
          }
        } else {
          //Create a new user
          const newUser = await prisma.user.create({
            data: {
              email,
              password: hashedPassword,
            },
          });
          return { email: newUser.email, id: newUser.id };
        }

        return null;
      },
    }),
  ],

  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
    // jwt({ token, user, account }) {
    //   if (account) {
    //     token.id = user.id;
    //   }
    //   return token;
    // },
  },
});
