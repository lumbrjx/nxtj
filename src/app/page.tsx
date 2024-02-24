"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });
  console.log("session", session);
  return (
    <>
      <nav className="bg-blue-800 p-4">
        <ul className="flex justify-evenly text-2xl font-bold">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/api/auth/signin">Sign In</Link>
          </li>
          <li>
            <Link href="/api/auth/signout">Sign Out</Link>
          </li>
        </ul>
      </nav>
      <p className="text-white">{session?.user?.name}</p>
    </>
  );
}
