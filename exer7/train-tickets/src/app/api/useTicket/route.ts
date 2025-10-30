import { NextResponse } from "next/server";
import { deleteTicket } from "@/server/mongodb/actions/deleteTicket";

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const ticketID = searchParams.get("ticketID");
  const result = await deleteTicket({ ticketID: ticketID! });

  if (result === true) return NextResponse.json("Success", { status: 200 });
  if (result === "Ticket Not Found") return NextResponse.json(result, { status: 400 });
  return NextResponse.json("Failed", { status: 500 });
}