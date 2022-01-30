import { collection, doc, DocumentData, setDoc } from "firebase/firestore";
import React, { SetStateAction } from "react";
import { Access } from "../App";
import { db } from "../firebaseconfig";
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface User {
  name: string | null;
  id: string;
  avatar: string | null;
  header?: string;
  followers?: Array<{}>;
  followings?: Array<{}>;
  bio: string;
  joinDate: string;
}

export const addUser = async (
  name: string | null,
  users: Array<DocumentData> | undefined,
  id: string,
  avatar: string | null,
  setAccess: React.Dispatch<SetStateAction<Access>>
) => {
  console.log(id);
  const exists = users?.some((user) => user.id === id);
  console.log(users);

  if (exists) {
    setAccess({ accessId: id, hasAccess: true, status: "granted" });
    console.log("wwww");
    return;
  }
  const date = new Date();
  const user: User = {
    name,
    id,
    avatar,
    header:
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/4ee81e48458093.5dc47c0a0352c.jpg",
    followers: [],
    followings: [],
    bio: "Hey Im new to Twitter!",
    joinDate: `${months[date.getMonth()]},${date.getFullYear()}`,
  };

  try {
    const usersRef = collection(db, "users");
    await setDoc(doc(usersRef, id), user);
    setAccess({ accessId: id, hasAccess: true, status: "granted" });
  } catch (err) {
    console.error(err);
    setAccess({ accessId: undefined, hasAccess: false, status: "denied" });
  }
};
