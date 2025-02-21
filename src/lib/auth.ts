// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   callbacks: {
//     async signIn() {
//       return false; // Tidak otomatis login
//     },
//     async jwt({ token, account, profile }) {
//       if (account && profile) {
//         return {
//           id: profile.sub,
//           name: profile.name,
//           email: profile.email,
//           image: profile.picture,
//         };
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user = token as any;
//       return session;
//     },
//   },
// };

// export const { handlers, auth } = NextAuth(authOptions);
