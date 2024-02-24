import { RegisterSchema } from "@/models/forms";
import bcrypt from "bcrypt";
import { createUser } from "@/server/services/auth";
export async function hashAndCreateUser(body: RegisterSchema) {
  bcrypt.hash(body.password, 10, async (err: any, hash: string) => {
    await createUser({ ...body, password: hash });
  });
}
