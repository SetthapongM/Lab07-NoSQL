import connectMongoDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const projects = await Project.find();
  return NextResponse.json(projects);
}

export async function POST(request) {
  const body = await request.json();
  await connectMongoDB();
  const project = await Project.create(body);
  return NextResponse.json(project);
}
