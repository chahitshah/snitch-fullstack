import ImageKit, { toFile } from "@imagekit/nodejs";
import { config } from "../config/config.js";

const client = new ImageKit({
    privateKey: config.IMAGEKIT_PRIVATE_KEY,
});

export const uploadImage = async (fileBuffer, fileName) => {
    const response = await client.files.upload({
        file: await toFile(fileBuffer, fileName),
        fileName: fileName,
        folder: "/snitch-fullstack",
    });

    return response;
};