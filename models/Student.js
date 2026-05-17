import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    stdId: String,
    stdName: String,
    email: String,
    password: String,
    gpa: Number,
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Student ||
  mongoose.model("Student", StudentSchema);
