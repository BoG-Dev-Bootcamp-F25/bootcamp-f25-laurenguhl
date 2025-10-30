import connectDB from "../index";
import Ticket from "../models/Ticket";

export const createTicket = async ({lineColor, station, userID}: { 
    lineColor: string; station: string; userID: string; }) => {
  try {
    await connectDB();
    const ticket = new Ticket({ lineColor, station, userID });
    await ticket.save();
    return true;
  } catch (error) {
    console.error("Error creating ticket:", error);
    return false;
  }
};