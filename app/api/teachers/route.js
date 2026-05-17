import connectMongoDB from "@/lib/mongodb";
import Teacher from "@/models/Teacher";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const teachers = await Teacher.find();
  return NextResponse.json(teachers);
}

export async function POST(request) {
  const body = await request.json();
  await connectMongoDB();

  // หา teacher ล่าสุด
  const lastTeacher = await Teacher.findOne().sort({ lecId: -1 });
  let nextId = 68001;
  if (lastTeacher) {
    nextId = parseInt(lastTeacher.lecId) + 1;
  }

  const teacher = await Teacher.create({
    ...body,
    lecId: nextId.toString(),
  });

  return NextResponse.json(teacher);
}
