import { s3Client } from "@/lib/s3"; 
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { fileName, fileType } = await req.json();
    
    // File name ko unique banana taaki purani file override na ho
    const uniqueFileName = `${Date.now()}-${fileName.replace(/\s+/g, "-")}.webp`;

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