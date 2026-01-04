import mongoose from "mongoose";

const emailNotificationSchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
  recipientEmail: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
  date: { type: String, required: true }, // Format: YYYY-MM-DD for daily tracking
}, { timestamps: true });

// Index for daily email count queries
emailNotificationSchema.index({ date: 1, propertyId: 1 });

export default mongoose.models.EmailNotification || mongoose.model("EmailNotification", emailNotificationSchema);



