import connectDB from "../index";
import Ticket from "../models/Ticket";

export const deleteTicket = async ({ ticketID }: { ticketID: string }) => {
  try {
    await connectDB();
    const result = await Ticket.findByIdAndDelete(ticketID);
    if (!result) return "Ticket Not Found";
    return true;
  } catch (error) {
    console.error("Error deleting ticket:", error);
    return false;
  }
};