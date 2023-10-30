import axios from "axios";

import crypto from "crypto";
import { env } from "~/env.mjs";

const generateSHA1 = (data: string) => {
  const hash = crypto.createHash("sha1");
  hash.update(data);
  return hash.digest("hex");
};

const generateSignature = (publicId: string, apiSecret: string) => {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

const getPublicIdFromUrl = (url: string) => {
  const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;

  const match = url.match(regex);
  return match ? match[1] : null;
};

export const deleteImageCloudinary = async (imageUrl: string) => {
  const publicId = getPublicIdFromUrl(imageUrl) ?? "";

  const cloudName = env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const timestamp = new Date().getTime();
  const apiKey = env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
  const signature = generateSHA1(generateSignature(publicId, apiSecret));
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

  try {
    const response = await axios.post(url, {
      public_id: publicId,
      signature: signature,
      api_key: apiKey,
      timestamp: timestamp,
    });

    console.error(response);
  } catch (error) {
    console.error(error);
  }
};
