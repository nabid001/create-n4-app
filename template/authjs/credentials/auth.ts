import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { userInfo } from "os";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const { email, password } = credentials; // add error handling

        // 1. find and check if the user already exists. with proper error handling

        // 2. get the user's hasPassword and compare with the password. with proper error handling

        // 3. if the password is correct, return the user object - with proper error handling
        // else return null

        // @ts-ignore
        return user;
      },
    }),
  ],
});
