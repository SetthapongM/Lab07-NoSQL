import connectMongoDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  const { id } = await context.params;
  await connectMongoDB();
  const project = await Project.findById(id);
  return NextResponse.json(project);
}

export async function PUT(request, context) {
  const { id } = await context.params;
  const body = await request.json();
  await connectMongoDB();
  const updatedProject = await Project.findByIdAndUpdate(id, body, {
    new: true,
  });
  return NextResponse.json(updatedProject);
}

export async function DELETE(request, context) {
  const { id } = await context.params;
  await connectMongoDB();
  await Project.findByIdAndDelete(id);
  return NextResponse.json({
    message: "Deleted Successfully",
  });
}
