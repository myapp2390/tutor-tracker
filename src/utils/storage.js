/**
 * Cloudinary file upload utility.
 * Uses unsigned uploads via a Cloudinary upload preset.
 * No API secret needed on the client — only cloud name + unsigned preset.
 */

const CLOUD_NAME = "uuziy0zt";
const UPLOAD_PRESET = "tutor_tracker"; // we'll create this unsigned preset

/**
 * Uploads a File to Cloudinary and returns its secure URL.
 * folder: e.g. "materials", "assignments", "chat"
 */
export async function uploadFile(file, storagePath) {
  // Extract folder from storagePath (e.g. "materials/uid/filename" -> "materials")
  const folder = storagePath.split("/")[0];

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", `tutor_tracker/${folder}`);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || "Upload failed");
  }

  const data = await res.json();
  return data.secure_url;
}

/**
 * Deletes a file from Cloudinary.
 * For simplicity we skip client-side deletion (requires signed requests).
 * Files can be managed from the Cloudinary dashboard.
 */
export async function deleteFile(url) {
  // Deletion via client requires a signed request with API secret
  // which shouldn't be exposed on the frontend.
  // Old files can be cleaned up from the Cloudinary Media Library dashboard.
  console.log("deleteFile: manage deletions from Cloudinary dashboard", url);
}
