import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get("file") as File;

    if (!imageFile) {
      return NextResponse.json({ success: false, error: "No image provided" }, { status: 400 });
    }

    // Forward file to FastAPI backend as multipart/form-data
    const fd = new FormData();
    fd.append("file", imageFile);

    const backendResponse = await fetch("http://127.0.0.1:8000/predict/", {
      method: "POST",
      body: fd,
      // DO NOT set headers here — fetch will set multipart headers automatically for FormData
    });

    const data = await backendResponse.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Prediction failed", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
