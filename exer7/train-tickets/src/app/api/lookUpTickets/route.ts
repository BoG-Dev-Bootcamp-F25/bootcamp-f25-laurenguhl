import { NextResponse } from "next/server";
import { readTicketsByUser } from "@/server/mongodb/actions/readTicketsByUser";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userID = searchParams.get("userID");
  const result = await readTicketsByUser({ userID: userID! });

  if (result && result.length >= 0) return NextResponse.json(result, { status: 200 });
  return NextResponse.json("Failed", { status: 500 });
}