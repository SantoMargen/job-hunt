const axios = require("axios");

const instanceImageKitApi = axios.create({
    baseURL: process.env.IMAGEKIT__ENDPOINT,
    auth: {
        username: process.env.IMAGEKIT_PRIVATE,
    },
});

module.exports = instanceImageKitApi;