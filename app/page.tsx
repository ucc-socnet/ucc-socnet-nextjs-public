'use client'
import Navbar from "./components/navbar/navbar"
import Sidebar from "./components/sidebar/sidebar"
import CreatePostCard from "./components/create_post_card/create_post_card"
import PostCard from "./components/post_card/post_card"
import { useEffect, useState } from 'react';
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

  // fetch the posts by calling the get_posts api
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/get_posts');
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />
     
      <div className="flex h-auto bg-stone-200">
        <Sidebar />
     
        <div className="posts m-auto">
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
            />))}     
        </div>
      </div>
    </>
  );
}