'use client';

import { Suspense } from 'react';
// import styles from './styles.module.css';
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
      <div className={`h-screen md:h-auto lg:h-auto bg-stone-200`}>

        <div className={`relative w-[100%] h-50 md:h-100 md:px-5 lg:pt-5`}>
          <div className={`
            w-[100%] h-[100%]
            bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%
            `}></div>
        </div>

        {/* main container */}
        <div className="md:flex lg:flex relative mx-5 md:mx-20 lg:mx-20">

          {/* this for bio main container*/}
          <div className="md:min-h-screen lg:min-h-screen w-[100%]">
            <div className="md:sticky lg:sticky top-20 shrink-0 ">

              <div className={`mt-5 md:mt-5 lg:mt-5 w-100% text-center shadow-md rounded-md shrink-0 bg-white p-5`}>
                <h1 className="text-2xl">{username}</h1>
                <p className="mt-10 text-justify">
                  {userBio ? userBio : 'no bio'}
                </p>
              </div>

              {/* for friends button and stuff */}
              <div className=" md:block mt-2 justify-between">
                <div className="w-[100%] mt-2 md:mt-5 shadow-md text-sm md:text-lg p-5 bg-white rounded-xl flex items-center justify-between">
                  <p>Friends</p> 
                  <Link href="/" className="text-blue-500">See more</Link>
                </div>
                <div className=" w-[100%] mt-2 md:mt-5 shadow-md text-sm md:text-lg p-5 bg-white rounded-xl flex items-center justify-between">
                  <p>Groups</p> 
                  <Link href="/" className="text-blue-500">See more</Link>
                </div>
                <div className=" w-[100%] mt-2 md:mt-5 shadow-md text-sm md:text-lg p-5 bg-white rounded-xl flex items-center justify-between">
                  <p>Photos</p> 
                  <Link href="/" className="text-blue-500">See more</Link>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-5 md:mx-10 w-[100%]">{post_cards}</div>
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