'use server'
import { NextResponse } from 'next/server';
import { db } from '@/firebase/config';
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, 'users_posts'));

    const data = snapshot.docs.map(doc => ({
      postID: doc.id,
      postDate: doc.data().date_posted,
      username: doc.data().username,
      postContent: doc.data().postContent,
      likes: 12,
    }));

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: `'Failed to fetch posts: ${error}'` }, { status: 500 });
  }
};