import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebaseconfig";
import { handleHeaderChange } from "./HandleHeaderChange";
const validTypes = ["image/jpeg", "image/jpg", "image/png"];

export const handleUpload = (
  file: File | null | undefined,
  id: string | undefined
) => {
  if (file && validTypes.includes(file.type)) {
    console.log("ran");
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      () => {},
      (err) => {
        console.error(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          handleHeaderChange(id, url);
        });
      }
    );
  } else {
    alert("please upload only valid image types");
    return;
  }
};
