'use client'
import Navbar from "./components/navbar/navbar"
import Sidebar from "./components/sidebar/sidebar"
import CreatePostCard from "./components/create_post_card/create_post_card"
import PostCard from "./components/post_card/post_card"
import { useEffect, useState } from 'react';

export default function HomePage() {
  type Post = {
    postID: string;
    postDate: string;
    username: string;
    postContent: string;
    likes: number;
  };

  const [posts, setPosts] = useState<Post[]>([]);

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
      <div className="flex h-[100%] bg-stone-200">
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