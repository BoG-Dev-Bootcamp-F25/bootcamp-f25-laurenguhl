import { NextResponse } from "next/server";
import { updateTicketByUser } from "@/server/mongodb/actions/updateTicketByUser";

export async function PATCH(req: Request) {
  const body = await req.json();
  const result = await updateTicketByUser(body);

  if (result === true) return NextResponse.json("Success", { status: 200 });
  if (result === "Ticket Not Found") return NextResponse.json(result, { status: 400 });
  return NextResponse.json("Failed", { status: 500 });
}