import { NextResponse } from "next/server";
import { createUser } from "@/server/mongodb/actions/createUser";

export async function POST(req: Request) {
  const body = await req.json();
  const result = await createUser(body);
  if (result) return NextResponse.json("Success", { status: 200 });
  return NextResponse.json("Failed", { status: 500 });
}