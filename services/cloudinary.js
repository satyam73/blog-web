export async function uploadImageToCloud(imageFile, folder = "blog-web-app") {
  try {
    const type = imageFile.type;

    if (type === "image/png" || type === "image/jpeg") {
      const imageFormData = new FormData();

      imageFormData.append("file", imageFile);
      imageFormData.append("upload_preset", "blog-web-app");
      imageFormData.append("cloud_name", "dl5pqfdrf");
      imageFormData.append("asset_folder", folder);
      imageFormData.append("folder", folder);

      imageFormData.append("tags", [
        "blog-web-app",
        "userPic",
        "profile",
        "profilePic",
      ]);
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dl5pqfdrf/image/upload",
        {
          method: "post",
          body: imageFormData,
        }
      );
      const data = await response.json();
      const { status } = response;
      const { url } = data;

      if (status === 200) return url;
      throw new Error();
    }
  } catch (error) {
    console.error('Some error occured while updating profile picture ', error)
  }
}