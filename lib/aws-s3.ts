import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
})

export async function uploadToS3(
  file: File,
  key: string,
  bucket: string = process.env.AWS_S3_BUCKET || ''
) {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: buffer,
    ContentType: file.type,
  })

  await s3Client.send(command)
  return `https://${bucket}.s3.amazonaws.com/${key}`
}

export async function deleteFromS3(key: string, bucket: string = process.env.AWS_S3_BUCKET || '') {
  const command = new DeleteObjectCommand({
    Bucket: bucket,
    Key: key,
  })

  await s3Client.send(command)
}

export default s3Client
