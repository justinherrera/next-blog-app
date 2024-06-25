// Step 1: Import the S3Client object and all necessary SDK commands.
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';


const client = new S3Client({
    endpoint: process.env.SPACES_ENDPOINT as string, 
    forcePathStyle: true, 
    region: "ap-southeast-1", 
    credentials: {
      accessKeyId: process.env.SPACES_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.SPACES_SECRET_ACCESS_KEY as string
    }
});

export const uploadImage = async (filename: string, blob: string) => {
  const command = {
    Bucket: "blog-app-space", 
    Key: filename,
    Body: blob, 
    ACL: "public-read"
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
