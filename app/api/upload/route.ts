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

    const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ message: "File too large. Max size is 20MB" }, { status: 400 });
    }

    const uniqueName = `hoa-course-images/${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
    const bucket = storage.bucket(bucketName);
    const fileNode = bucket.file(uniqueName);

    // Use streaming for better performance with larger files
    const stream = fileNode.createWriteStream({
      resumable: false, // Recommended for smaller files to avoid overhead
      contentType: file.type,
      // Removed 'public: true' to support buckets with uniform bucket-level access
    });

    const uploadPromise = new Promise((resolve, reject) => {
      stream.on('error', (err) => reject(err));
      stream.on('finish', () => resolve(true));
    });

    const readable = (file as any).stream(); // Web stream
    for await (const chunk of readable) {
      stream.write(chunk);
    }
    stream.end();

    await uploadPromise;
    
    
    
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${uniqueName}`;

    return NextResponse.json({ url: publicUrl }, { status: 200 });
  } catch (error: any) {
    console.error("GCP Upload Error:", error);
    return NextResponse.json({ message: "Failed to upload file", error: error.message }, { status: 500 });
  }
}
