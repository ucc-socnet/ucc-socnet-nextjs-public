'use server'
import { db } from '@/firebase/config';
import { updateDoc, getDoc, setDoc, doc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const postID = url.searchParams.get('postID');
    const username = url.searchParams.get('username');

    if (!postID || !username) {
      return new Response(JSON.stringify({ error: 'Missing postID or username' }), { status: 400 });
    }

    const postRef = doc(db, 'users_posts', postID);
    const postSnap = await getDoc(postRef);

    if (!postSnap.exists()) {
      return new Response(JSON.stringify({ error: 'Post not found' }), { status: 404 });
    }

    const currentLikes = postSnap.data().likes ?? 0;

    const userLikeRef = doc(db, "usernames", username, "user_likes", postID);
    const userLikeSnap = await getDoc(userLikeRef);

    if (userLikeSnap.exists()) {
      console.log("Already liked this post");
      return new Response(JSON.stringify({ message: 'Already liked' }), { status: 200 });
    }

    await setDoc(userLikeRef, {
      date_liked: new Date().toISOString(),
    });

    await updateDoc(postRef, {
      likes: currentLikes + 1,
    });

    return new Response(JSON.stringify({ message: 'Like updated' }), { status: 200 });

  } catch (error) {
    console.error("Error handling post like:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
