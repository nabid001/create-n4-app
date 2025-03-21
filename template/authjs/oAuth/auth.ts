import NextAuth, { Session } from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account }) {
      if (!user) {
        return false;
      }

      // Add user to your database here.
      // For example, you could save user.id, user.name, and user.email to a database.
      // await db.collection('users').insertOne({
      //   id: user.id,
      //   name: user.name,
      //   email: user.email,
      // });

      return true;
    },
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, session }) {
      return token;
    },
  },
});
