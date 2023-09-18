import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema(
  {
    taskName: {
      type: String,
      required: true,
      trim: true,
      maxlength: [300, "title cannot be grater than 200 characters"],
    },
    dueDate: {
        type: String,
        
    },
    status: {
        type: Boolean,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User schema
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Task || model("Task", TaskSchema);
