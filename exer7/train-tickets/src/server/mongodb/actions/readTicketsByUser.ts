import connectDB from "../index";
import Ticket from "../models/Ticket";

export const readTicketsByUser = async ({ userID }: { userID: string }) => {
  try {
    await connectDB();
    const tickets = await Ticket.find({ userID });
    return tickets;
  } catch (error) {
    console.error("Error reading tickets:", error);
    return false;
  }
};