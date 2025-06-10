import path from "path";

export const UploadFile = async (file) => {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = file.name;
  try {
    await writeFile(
      path.join(process.cwd(), "public/assets/" + fileName),
      buffer
    );
    return fileName;
  } catch (error) {
    console.log("Error occured ", error);
  }
};
