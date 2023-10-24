import validator from "validator";
import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: [true, "Email already exists"],
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  subjects: {
    type: Array,
    default: [
      "Amharic",
      "English",
      "Mathematics",
      "Biology",
      "Chemistry",
      "Physics",
      "Geography",
      "History",
      "Citizenship",
      "Physical Education",
      "Economics",
      "Agriculture",
      "Music",
      "Art",
      "Social Studies",
      "Geology",
      "Other",
      "ሌላ",
      "Kan biraa",
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model("User", userSchema);
export default User;
