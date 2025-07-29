'use client'
import Navbar from "./components/navbar/navbar"
import Sidebar from "./components/sidebar/sidebar"
import CreatePostCard from "./components/create_post_card/create_post_card"
import PostCard from "./components/post_card/post_card"
import { useEffect, useState } from 'react';
import { db } from '@/firebase/config';
import { updateDoc, doc } from "firebase/firestore";

// import { DisplayPosts } from './display_post_cards';

export default function HomePage() {
  type Post = {
    postID: string;
    postDate: string;
    username: string;
    postContent: string;
    likes: number;
  };

  const [posts, setPosts] = useState<Post[]>([]);
  // const [userID, setUserID] = useState('');
  // const [username, setUsername] = useState('');

  // useEffect( ()=>{
  //   const user_res = await fetch('/api/get_session', { method: 'POST' });
  //   const data = await user_res.json();
  //   setUserID(data.userID);
  // }, []);

  // const updateUserLikes = async (uid: string, pid: string)=> {
  //   await updateDoc(doc(db, "users_likes", uid), {
  //     postID: pid,
  //   });    
  // }

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/get_posts');
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const testLike = async (id: string, likes: number)=> {
    console.log("Like button is clicked.");
    console.log(`Post ID = ${id}`);

    await updateDoc(doc(db, "users_posts", id), {
      likes: likes + 1,
    });

    // updateUserLikes(userID, id);
    fetchPosts();
  };
  
  useEffect(() => { fetchPosts(); }, []);

  return (
    <>
      <Navbar />
     
      <div className="flex h-auto bg-stone-200">
        <Sidebar />
     
        <div className="posts m-10 lg:w-auto">
          <CreatePostCard />
          {posts.map((post) => (
            <PostCard
              key={post.postID}

              postID={post.postID}
              username={post.username}
              postDate={post.postDate}
              postText={post.postContent}
              imagePath=""
              likes={post.likes}
              onLike={()=>{ testLike(post.postID, post.likes) }}

            />))}
        </div>
      </div>
    </>
  );
}