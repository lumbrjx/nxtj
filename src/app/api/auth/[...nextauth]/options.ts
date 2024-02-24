import type { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/config/drizzle-client";
import { Adapter } from "next-auth/adapters";
import { getUserAccount, getUserData } from "@/server/services/auth";
import { formLog } from "@/models/forms";

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const parsed = formLog.parse(credentials);

        const user = await getUserAccount(parsed.email);
        if (!user) return null;
        if (user.data?.password !== parsed.password) return null;

        const userdata = await getUserData(user.data.email);
        if (!userdata.ok) return null;
        return userdata.data as User;
      },
    }),
  ],
};
