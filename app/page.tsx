'use client'
import Navbar from "./components/navbar/navbar"
import Sidebar from "./components/sidebar/sidebar"
import CreatePostCard from "./components/create_post_card/create_post_card"
import PostCard from "./components/post_card/post_card"
import { auth, db } from '@/firebase/config';
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const snapshot = await getDocs(collection(db, 'users_posts'));
      const data = snapshot.docs.map(doc => ({
        postID: doc.id,
        postDate: doc.data().date_posted,
        username: doc.data().username,
        postContent: doc.data().postContent,
        likes: 12,
      }));
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-stone-200">
        <Sidebar />
        <div className="posts">
          <CreatePostCard />
          {posts.map((post) => (
            <PostCard
              key={post.postID}
              username={post.username}
              postDate={post.postDate}
              postText={post.postContent}
              imagePath="" // update if you store image URL
              likes={post.likes}
            />
          ))}
        </div>
      </div>
    </>
  );
}