import { s3Client } from "@/lib/s3"; 
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { fileName, fileType } = await req.json();
    
    // ✅ SECURITY: File type validation
    const allowedTypes = ['image/webp', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(fileType)) {
      return NextResponse.json({ error: "Invalid file type. Only images are allowed." }, { status: 400 });
    }
    
    // ✅ SECURITY: File name sanitization
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "-");
    if (!sanitizedFileName || sanitizedFileName.length > 255) {
      return NextResponse.json({ error: "Invalid file name" }, { status: 400 });
    }
    
    // File name ko unique banana taaki purani file override na ho
    const uniqueFileName = `${Date.now()}-${sanitizedFileName}.webp`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: uniqueFileName,
      ContentType: 'image/webp', // 🔥 Yahan WebP force kar diya hai
    });

    // 60 seconds ke liye valid upload link
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
    
    // Final image link jo database mein jayega
    const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;

    return NextResponse.json({ uploadUrl, imageUrl });
  } catch (error) {
    console.error("S3 API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}