"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
export default function Navbar() {
  const { data: session } = useSession();
  if (session) {
    redirect("/");
  }
  return <>/* register form */</>;
}
