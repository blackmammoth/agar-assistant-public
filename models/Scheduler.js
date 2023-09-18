import { Schema, model, models } from "mongoose";

const SchedulerSchema = new Schema(
  {
    Id: {
      type: Number,
      required: true,
    },
    Subject: {
      type: String,
      required: true,
    },
    StartTime: {
      type: Date,
      required: true,
    },
    EndTime: { 
      type: Date,
    },
    IsAllDay: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User schema
      // Make required to true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models?.Scheduler || model("Scheduler", SchedulerSchema);
