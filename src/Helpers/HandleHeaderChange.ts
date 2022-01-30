import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";

export const handleHeaderChange = async (
  id: string | undefined,
  url: string
) => {
  const ref = doc(db, "users", `${id}`);
  try {
    await updateDoc(ref, { header: url });
  } catch (err) {
    console.error(err);
  }
};
