const cloudinary = require('cloudinary').v2;
const Busboy = require('busboy');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }
  // Netlify passes base64 body when using binary; here we expect multipart but Netlify may require configuration.
  // For production, use an explicit upload endpoint (or unsigned client-side upload to Cloudinary).
  return { statusCode: 501, body: JSON.stringify({ error: 'Multipart upload handler placeholder. Use client-side unsigned upload for Cloudinary or implement Busboy parsing here.' }) };
};
