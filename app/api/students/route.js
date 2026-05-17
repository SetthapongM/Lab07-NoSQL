import connectMongoDB from "@/lib/mongodb";
import Student from "@/models/Student";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  await connectMongoDB();
  const student = await Student.create(body);
  return NextResponse.json(student);
}

export async function GET() {
  await connectMongoDB();
  const students = await Student.find();
  return NextResponse.json(students);
}
