"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });
  return (
    <>
      <p className="text-white">{session?.user?.name}</p>
      <button
        onClick={() => {
          signOut({ callbackUrl: "/" });
        }}
      >
        signout
      </button>
    </>
  );
}
