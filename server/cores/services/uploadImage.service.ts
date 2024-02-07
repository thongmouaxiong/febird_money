import { Cloudinary } from "../configs/cloudinary";

const UploadImage = async (img: string, oldImg?: string): Promise<string> => {
  return new Promise<string>(async (resolve, rejects) => {
    try {
      if (!img) resolve("");
      if (oldImg) {
        const spliturl = oldImg.split("/");
        const img_id = spliturl[spliturl.length - 1].split(".")[0];
        console.log("delete ", img_id);
        await Cloudinary.cloud().uploader.destroy(img_id);
      }

      const res_upload = await Cloudinary.cloud().uploader.upload(img, {
        public_id: `IMG_${Date.now()}`,
        resource_type: "auto",
      });
      resolve(res_upload.url);
    } catch (err) {
      console.log("upload image error ", err);
      rejects(err);
    }
  });
};

export default UploadImage;
