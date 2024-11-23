import { Blob } from '@vercel/blob';  // Assuming Vercel Blob SDK is available

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const file = req.files.file; // Assuming file is sent in the 'file' field
      const blob = new Blob(file);
      
      // Upload to Vercel Blob
      const blobUrl = await blob.upload(); // This depends on the Vercel Blob SDK API

      return res.status(200).json({ success: true, blobUrl });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }
  res.status(405).json({ success: false, message: 'Method Not Allowed' });
}
