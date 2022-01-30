import { doc , updateDoc  } from "firebase/firestore";
import { db } from "../firebaseconfig";

export const handleNewBio = async (userId:string|undefined, bio:string) => {
  const ref = doc(db, "users", `${userId}`);
  try {
    await updateDoc(ref, { bio: bio });
  } catch (err) {
    console.error(err);
  }
};
