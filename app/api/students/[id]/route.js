import connectMongoDB from "@/lib/mongodb";
import Student from "@/models/Student";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  const { id } = await context.params;
  await connectMongoDB();
  const student = await Student.findById(id);
  return NextResponse.json(student);
}

export async function PUT(request, context) {
  const { id } = await context.params;
  const body = await request.json();
  await connectMongoDB();
  const updatedStudent = await Student.findByIdAndUpdate(id, body, {
    new: true,
  });
  return NextResponse.json(updatedStudent);
}

export async function DELETE(request, context) {
  const { id } = await context.params;
  await connectMongoDB();
  await Student.findByIdAndDelete(id);
  return NextResponse.json({
    message: "Deleted Successfully",
  });
}
