import { arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";

type str = string;
export const handleLikeTweet = async (
  tweetId: str,
  userId: str,
  currentUserId: str | undefined
): Promise<void> => {
  const docRef = doc(collection(db, "timeline"), `${userId}${tweetId}`);
  console.log(docRef);
  try {
    await updateDoc(docRef, { likes: arrayUnion(currentUserId) });
  } catch (err) {
    console.error(err);
  }
};
