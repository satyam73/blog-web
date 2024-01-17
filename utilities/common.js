export const fileToBlob = (file) => {
  if (!file) return;

  return URL.createObjectURL(file);
}



