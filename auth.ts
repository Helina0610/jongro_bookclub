import { KyselyAdapter } from "@auth/kysely-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "./database/postgres";
import type { UsersResponse } from "./database/types/users";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await db
          .selectFrom("bookclub.users")
          .selectAll()
          .where("user_id", "=", credentials.user_id as string)
          .executeTakeFirst();

        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.user_pw as string, user.user_pw);
        if (!isValid) return null;
        return {
          id: String(user.user_sn),
          user_id: user.user_id,
          user_nm: user.user_name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" ? "__Secure-next-auth.session-token" : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        // maxAge를 아예 선언하지 않거나,
        // 일부 라이브러리 버전에서는 null이 작동하지 않을 수 있으므로
        // 아래와 같이 세션 전략을 확인해야 합니다.
      },
    },
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user_id = (user as UsersResponse).user_id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.user_id = token.user_id as string;
      }
      return session;
    },
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;

      if (pathname === "/login") {
        return !auth;
      }

      if (pathname === "/") {
        return !!auth;
      }

      return true;
    },
  },
});
