import mongoose, { Schema } from "mongoose";

const ticketSchema = new Schema({
  lineColor: { type: String, required: true },
  station: { type: String, required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.models?.Ticket || mongoose.model("Ticket", ticketSchema);