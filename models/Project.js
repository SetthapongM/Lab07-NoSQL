import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    termYear: String,
    lecId: [String],
    stdId: [String],
    projectName: String,
    projectImage: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
