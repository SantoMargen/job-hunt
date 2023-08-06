const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY__NAME, 
    api_key: process.env.CLOUDINARY__API_KEY, 
    api_secret: process.env.CLOUDINARY__SECRET_KEY
});
module.exports = cloudinary;