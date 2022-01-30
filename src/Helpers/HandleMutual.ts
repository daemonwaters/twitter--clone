import {
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseconfig";

type str = string | undefined;

export const handleMutual = async (
  recommendedUserId: str,
  currentUserId: str
): Promise<void> => {
  const usersCollection = collection(db, "users");
  const subjectUserRef = doc(usersCollection, currentUserId);
  const objectUserRef = doc(usersCollection, recommendedUserId);
  try {
    await updateDoc(subjectUserRef, {
      followings: arrayUnion({
        id: recommendedUserId
      }),
    });
    await updateDoc(objectUserRef, {
      followers: arrayUnion({
        id: currentUserId,
      }),
    });
  } catch (err) {
    console.error(err);
  }
};
