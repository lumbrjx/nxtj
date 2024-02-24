import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import { formReg } from "@/models/forms";
import { hashAndCreateUser } from "@/lib/helpers/hashAndCreate";
export async function POST(req: NextRequest) {
  const session = await getServerSession(options);
  if (session) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  try {
    const { email, username, password } = await req.json();
    const parsed = formReg.parse({ email, username, password });
    await hashAndCreateUser(parsed);
    return NextResponse.json({ ok: true, error: null }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
