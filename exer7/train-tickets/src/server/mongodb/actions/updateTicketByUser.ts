import connectDB from "../index";
import Ticket from "../models/Ticket";

export const updateTicketByUser = async ({ticketID, userID}: { 
    ticketID: string; userID: string; }) => {
  try {
    await connectDB();
    const updated = await Ticket.findByIdAndUpdate(ticketID, { userID });
    if (!updated) return "Ticket Not Found";
    return true;
  } catch (error) {
    console.error("Error updating ticket:", error);
    return false;
  }
};