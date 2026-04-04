import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";

// Initialize storage only if we have the credentials otherwise it will crash locally if missing
const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

const bucketName = process.env.GCP_BUCKET_NAME || "hoa-bucket";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uniqueName = `receipts/${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
    
    const bucket = storage.bucket(bucketName);
    const fileNode = bucket.file(uniqueName);

    await fileNode.save(buffer, {
      contentType: file.type,
    });
    
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${uniqueName}`;

    return NextResponse.json({ url: publicUrl }, { status: 200 });
  } catch (error: any) {
    console.error("GCP Upload Error:", error);
    return NextResponse.json({ message: "Failed to upload file", error: error.message }, { status: 500 });
  }
}
