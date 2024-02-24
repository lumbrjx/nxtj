import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import { formReg } from "@/models/forms";
import { createUser } from "@/server/services/auth";
export async function POST(req: NextRequest) {
  const session = await getServerSession(options);
  if (session) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  try {
    const { email, username, password } = await req.json();
    const parsed = formReg.parse({ email, username, password });
    const user = await createUser(parsed);

    if (!user.ok)
      return NextResponse.json({ error: user.error.detail }, { status: 500 });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
