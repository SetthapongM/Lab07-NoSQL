import mongoose from "mongoose";
const TeacherSchema = new mongoose.Schema(
  {
    lecId: String,
    lecName: String,
    email: String,
    password: String,
    tel: [String],
  },
  {
    timestamps: true,
  },
);
export default mongoose.models.Teacher ||
  mongoose.model("Teacher", TeacherSchema);
