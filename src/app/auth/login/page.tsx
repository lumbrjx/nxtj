"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
// change google to credentials to use credentials
const SignIn = () => {
  const { data: session } = useSession();
  if (session) {
    redirect("/");
  }
  return (
    <>
      <button
        onClick={() => signIn("google", { redirect: true, callbackUrl: "/" })}
      >
        google
      </button>
    </>
  );
};

export default SignIn;
