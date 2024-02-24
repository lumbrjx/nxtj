import { createId } from "@paralleldrive/cuid2";
import { db } from "../../config/drizzle-client";
import { RegisterSchema } from "../../models/forms";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";
// Create new user in DB

export async function createUser(user: RegisterSchema) {
  try {
    await db.insert(schema.users).values({
      id: createId(),
      email: user.email,
      name: user.username,
      // other user data goes here
    });

    await db.insert(schema.cred_account).values({
      password: user.password,
      email: user.email,
    });
    return { error: null, ok: true };
  } catch (error: any) {
    return { error: error, ok: false };
  }
}
// Get a user account from DB
export async function getUserAccount(email: string) {
  try {
    const user = await db.query.cred_account.findFirst({
      where: (user, { eq }) => eq(user.email, email),
      columns: {
        password: true,
        email: true,
      },
    });
    if (!user) return { error: "no user", ok: false };

    return { error: null, ok: true, data: user };
  } catch (error) {
    return { error: error, ok: false };
  }
}

// Get a user data from DB
export async function getUserData(email: string) {
  try {
    const user = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });
    if (!user) return { error: "no user", ok: false };

    return { error: null, ok: true, data: user };
  } catch (error) {
    return { error: error, ok: false };
  }
}

// // Edit user's password
export async function editPassword(password: string, email: string) {
  try {
    await db
      .update(schema.cred_account)
      .set({ password: password })
      .where(eq(schema.cred_account.email, email));
    return { ok: true, error: null };
  } catch (error) {
    return { ok: false, error: error };
  }
}
