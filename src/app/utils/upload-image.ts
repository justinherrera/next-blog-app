// Step 1: Import the S3Client object and all necessary SDK commands.
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Content } from 'next/font/google';
import fs from 'fs';


const client = new S3Client({
    endpoint: process.env.SPACES_ENDPOINT as string, 
    forcePathStyle: true, 
    region: "ap-southeast-1", 
    credentials: {
      accessKeyId: process.env.SPACES_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.SPACES_SECRET_ACCESS_KEY as string
    }
});

export const uploadImage = async (file: File, data: ArrayBuffer) => {


  const command = {
    Bucket: "blog-app-space", 
    Key: file.name,
    Body: data, 
    ACL: "public-read",
    ContentType: file.type,
    ContentEncoding: "base64",
    Metadata: { 
      "x-amz-acl": "public-read",
      "Content-type": file.type
    },
    "Content-Type": file.type
  };
  
  const uploadObject = async () => {
    try {
      const data = await client.send(new PutObjectCommand(command));
      console.log(
        "Successfully uploaded object: " +
        command.Bucket +
          "/" +
          command.Key
      );
  
      console.log(data)
      return data;
    } catch (err) {
      console.log("Error", err);
    }
  };

  await uploadObject()
}



// // Step 5: Call the uploadObject function.
// uploadObject();
