import { getSessionGoogle } from "@/lib/next-auth/action";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (user && account?.provider === 'google') {
        const session = await getSessionGoogle();
        // Store Google data temporarily
        session.googleUser = {
          email: user.email!,
          name: user.name!,
          image: user.image!,
        };
        await session.save();
        
        return '/auth/login'; // Redirect back to login form
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  }
});

export { handler as GET, handler as POST };
