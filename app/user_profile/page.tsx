'use client';

import { Suspense } from 'react';
import styles from './styles.module.css';
import NavBar from '../components/navbar/navbar';
import PostCard from "../components/post_card/post_card";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '@/firebase/config';
import { useSearchParams } from 'next/navigation';  
import { updateDoc, getDoc, setDoc, doc } from "firebase/firestore";

type Post = {
  postID: string;
  postDate: string;
  username: string;
  postContent: string;
  likes: number;
};

function ProfileContent() {
  const searchParams = useSearchParams();
  const [username, setUsername] = useState('');
  const [userBio, setUserBio] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const param_uname = searchParams.get('username');
    if (param_uname) {
      setUsername(param_uname);
    }
  }, [searchParams]);

  const fetchPosts = async () => {
    try {
      const user_doc = await getDoc(doc(db, "usernames", username));
      if (user_doc.exists()) {
        const uid = user_doc.data();
        
        setUserBio(uid.bio);

        const posts_res = await fetch(`/api/get_posts?userID=${uid.userID}`);
        const posts_data = await posts_res.json();
        setPosts(posts_data);
      } else {
        console.warn("No user found with username: ", username);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    if (username) {
      fetchPosts();
    }
  }, [username]);

  const updateUserLikes = async (userID: string, postID: string, likes: number) => {
    const isExist = await getDoc(doc(db, "usernames", username, "user_likes", postID));

    if (isExist.exists()) {
      console.log("already liked this post");
      return false;
    } else {
      await setDoc(doc(db, "usernames", username, "user_likes", postID), {
        date_liked: new Date().toISOString(),
      });

      await updateDoc(doc(db, "users_posts", postID), {
        likes: likes + 1,
      });

      fetchPosts();
      return true;
    }
  };

  const testLike = async (id: string, likes: number) => {
    const res = await updateUserLikes("", id, likes);
    console.log(res);
  };

  const post_cards = posts.length > 0 ? (
    posts.map((post) => (
      <PostCard
        key={post.postID}
        postID={post.postID}
        username={post.username}
        postDate={post.postDate}
        postText={post.postContent}
        imagePath=""
        likes={post.likes}
        onLike={() => testLike(post.postID, post.likes)}
      />
    ))
  ) : (
    <div className="p-5 bg-white w-[100%] font-medium sticky top-20 rounded-xl shadow-md">
      No posts created.
    </div>
  );

  return (
    <>
      <NavBar />
      <div className={styles.info_container}>
        <div className={styles.profile}>
          <div className={styles.cover_profile}></div>
        </div>

        <div className="flex relative mx-20">
          <div className="min-h-screen">
            <div className="sticky top-20">
              <div className={`mt-10 ${styles.bio}`}>
                <h1 className="text-2xl">{username}</h1>

                <p className="mt-10 text-justify">
                  {userBio ? userBio : 'no bio'}
                </p>

              </div>

              <div className="shadow-md font-medium text-lg p-5 mt-5 bg-white rounded-xl flex justify-between">
                Friends <Link href="/" className="text-blue-500">See more</Link>
              </div>
              <div className="shadow-md font-medium text-lg p-5 mt-5 bg-white rounded-xl flex justify-between">
                Groups <Link href="/" className="text-blue-500">See more</Link>
              </div>
              <div className="shadow-md font-medium text-lg p-5 mt-5 bg-white rounded-xl flex justify-between">
                Photos <Link href="/" className="text-blue-500">See more</Link>
              </div>
            </div>
          </div>

          <div className="mt-10 mx-10 w-[100%]">{post_cards}</div>
        </div>
      </div>
    </>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="p-5">Loading profile...</div>}>
      <ProfileContent />
    </Suspense>
  );
}