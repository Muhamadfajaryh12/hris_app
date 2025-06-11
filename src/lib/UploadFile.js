import path from "path";
import fs from "fs/promises";

export const UploadFile = async (file) => {
  try {
    const buffer = await file.arrayBuffer();
    const fileExt = path.extname(file.name);
    const fileName = `${Date.now()}${fileExt}`;
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const filePath = path.join(uploadDir, fileName);
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(filePath, Buffer.from(buffer));

    return `/uploads/${fileName}`;
  } catch (error) {
    console.log("Error occured ", error);
  }
};
