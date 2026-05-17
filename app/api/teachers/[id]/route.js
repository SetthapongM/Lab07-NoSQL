import connectMongoDB from "@/lib/mongodb";
import Teacher from "@/models/Teacher";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  const { id } = await context.params;
  await connectMongoDB();
  const teacher = await Teacher.findById(id);
  return NextResponse.json(teacher);
}

export async function PUT(request, context) {
  const { id } = await context.params;
  const body = await request.json();
  await connectMongoDB();
  const updatedTeacher = await Teacher.findByIdAndUpdate(id, body, {
    new: true,
  });
  return NextResponse.json(updatedTeacher);
}

export async function DELETE(request, context) {
  const { id } = await context.params;
  await connectMongoDB();
  await Teacher.findByIdAndDelete(id);
  return NextResponse.json({
    message: "Deleted Successfully",
  });
}
