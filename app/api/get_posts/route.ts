'use server'
import { NextResponse } from 'next/server';
import { db } from '@/firebase/config';
import { collection, getDocs, query, where } from "firebase/firestore";

export async function GET(request: Request) {
  try {

    const url = new URL(request.url);
    const param = url.searchParams.get("userID");

    // if the param is empty display all
    // if not, display posts based on userID param

    let snapshot;

    if (param && param != "") {
      const posts_collection = collection(db, 'users_posts'); 
      const q = query(posts_collection, where('userID', '==', param));
      snapshot = await getDocs(q);      
    } else {
      snapshot = await getDocs(collection(db, 'users_posts'));
    }

    const data = snapshot.docs.map(doc => ({
      postID: doc.id,
      postDate: doc.data().date_posted,
      username: doc.data().username,
      postContent: doc.data().postContent,
      likes: (doc.data().likes) ? doc.data().likes : 0,
    }));

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: `'Failed to fetch posts: ${error}'` }, { status: 500 });
  }
};