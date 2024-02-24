import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { formRes, formResAfter } from "@/models/forms";
import { editPassword, getUserAccount } from "@/server/services/auth";
import bcrypt from "bcrypt";
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const parsed = formRes.parse({ email });
    const user = await getUserAccount(parsed.email);

    if (!user.ok)
      return NextResponse.json({
        ok: true,
        error: null,
        data: "reset link was sent",
      });
    const user_token = jwt.sign(
      { email: user.data?.email },
      process.env.RESET_TOKEN_SECRET,
      {
        expiresIn: "0.05h",
      },
    );
    // nodemailer
    return NextResponse.json(
      {
        ok: true,
        error: null,
        data: `${process.env.NEXTAUTH_URL}/reset/${user_token}`,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const parsed = formResAfter.parse({ email, password });
    const decoded = jwt.verify(
      parsed.email,
      process.env.RESET_TOKEN_SECRET,
    ) as {
      email: string;
    };

    const user = await getUserAccount(decoded.email);

    if (!user.ok)
      return NextResponse.json(
        {
          ok: false,
          error: "error reseting password",
        },
        { status: 403 },
      );
    bcrypt.hash(password, 10, async (err: any, hash: string) => {
      await editPassword(hash, decoded.email);
    });

    return NextResponse.json(
      {
        ok: true,
        error: null,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
