"use client";
import { redirect } from "next/navigation";

export default function ErrorPage({ error }: { error: Error }) {
  redirect("/");
}
