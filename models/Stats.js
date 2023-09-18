import { Schema, model, models } from "mongoose";

const StatsSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    outOf: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User schema
      // Make required to true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models?.Stats || model("Stats", StatsSchema);
