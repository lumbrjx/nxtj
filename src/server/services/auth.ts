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
// Get a user from DB
// export async function getUser(email: string, includeId: boolean) {
//   try {
//     const user = await db.query.user.findFirst({
//       where: (user, { eq }) => eq(user.email, email),
//       columns: {
//         id: includeId,
//         username: true,
//         password: true,
//         oauthToken: true,
//         email: true,
//         type: true,
//         TWO_FA: true,
//         twoFaEmail: true,
//       },
//     });
//     if (!user) {
//       return parseToResult(undefined, "user doesn't exist");
//     }
//     return parseToResult(await user);
//   } catch (error) {
//     return parseToResult(undefined, error as Error);
//   }
// }
// // Edit user's password
// export async function editPassword(password: string, email: string) {
//   try {
//     const user = await db
//       .update(schema.user)
//       .set({ password: password })
//       .where(eq(schema.user.email, email))
//       .returning({ userEmail: schema.user.email });
//     return parseToResult(user[0].userEmail);
//   } catch (error) {
//     return parseToResult(undefined, "user doesn't exist");
//   }
// }
// // Edit 2FA state
// export async function edit2fa(
//   email: string,
//   tfaemail: string | null,
//   type: boolean,
// ) {
//   try {
//     const user = await db
//       .update(schema.user)
//       .set({ twoFaEmail: tfaemail, TWO_FA: type })
//       .where(eq(schema.user.email, email))
//       .returning({
//         usertfaEmail: schema.user.twoFaEmail,
//         tfa: schema.user.TWO_FA,
//       });
//     if (!user[0]) {
//       return parseToResult(undefined, "user doesn't exist");
//     }
//
//     return parseToResult(user[0]);
//   } catch (error) {
//     return parseToResult(undefined, error as Error);
//   }
// }
//
