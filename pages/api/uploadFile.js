import { BlobStore } from '@vercel/blob';  
import multiparty from 'multiparty';  
import fs from 'fs';
import path from 'path';

const containerName = 'RequirementFiles';

export const config = {
  api: {
    bodyParser: false,  
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Parse the incoming form data (file upload)
      const formData = await parseForm(req);

      if (!formData.file || formData.file.length === 0) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
      }

      const file = formData.file[0]; 
      const filePath = file.path;  

      const blobstore = new BlobStore({
        container: containerName, 
      });

      const uploadResult = await blobstore.upload(filePath, {
        filename: file.originalFilename, 
      });

      const blobUrl = uploadResult.url;

      // Respond with the URL of the uploaded file
      return res.status(200).json({ success: true, blobUrl });
    } catch (error) {
      console.error('Error uploading file:', error);
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    // Handle non-POST requests (only POST is allowed for file upload)
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}

// Helper function to parse the incoming form data (file upload)
const parseForm = (req) => {
  return new Promise((resolve, reject) => {
    const form = new multiparty.Form(); // Initialize multiparty form parser

    // Optionally configure multiparty options (e.g., upload directory, max file size)
    form.uploadDir = path.join(process.cwd(), 'tmp'); // Save temporary files to 'tmp' directory
    form.keepExtensions = true; // Retain file extensions on uploaded files

    // Parse the incoming request
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);  // Reject if any errors occur during parsing
      } else {
        resolve(files); // Resolve with the parsed files
      }
    });
  });
};
