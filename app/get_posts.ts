'use server';

import { getDocs, collection } from "firebase/firestore";
import { db } from '@/firebase/config';

export async function getUsernames() {
  const username_collection = collection(db, "users_posts");
  const snapshot = await getDocs(username_collection); 

  const res = snapshot.docs.map(doc => ({
    postID: doc.id,
    postDate: doc.data().date_posted,
    username: doc.data().username,
    postContent: doc.data().postContent,
    likes: 12, // static value
  }));

  return res;
}