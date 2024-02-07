import cloudinary from "cloudinary";

export class Cloudinary {
  constructor(cloudName: string, apiKey: string, apiSecret: string) {
    cloudinary.v2.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
  }
  static cloud(){
    return cloudinary.v2;
  }
}
