'use client';
import styles from './styles.module.css';
import NavBar from '../components/navbar/navbar';
import PostCard from "../components/post_card/post_card"
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Profile() {
    type Post = {
        postID: string;
        postDate: string;
        username: string;
        postContent: string;
        likes: number;
    };

    const [username, setUsername] = useState('');
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {

                const user_res = await fetch('/api/get_session', { method: 'POST' });
                const data = await user_res.json();
                setUsername(data.username);
                console.log("Session payload:", data);

                const posts_res = await fetch(`/api/get_posts?userID=${data.userID}`);

                const posts_data = await posts_res.json();
                setPosts(posts_data);
                console.log(posts_data);

          } catch (error) {
                console.error('Error fetching posts:', error);
          }
    };

    fetchPosts();
    }, [posts]);

    return (
    <>

    <NavBar />
        
    <div className={styles.info_container}>
        <div className={styles.profile}>
            <div className={styles.cover_profile}></div>
            {/*<div className={styles.profile_photo}></div>*/}
        </div>

        <div className="flex justify-center gap-x-10 relative">

          <div className="min-h-screen">
            <div className="sticky top-20">
            <div className={`mt-10 ${styles.bio}`}>
              <h1 className="text-2xl">{username}</h1>
              <p className="mt-10 text-justify">Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development. Its purpose is to permit a page layout to be designed, independently of the copy that will subsequently populate it,</p>                  
            </div>
 
            <div className="shadow-md font-medium text-lg p-5 mt-5 bg-white rounded-xl flex justify-between">
              Friends
              <Link href="/" className="text-blue-500">See more</Link>
            </div>

            <div className="shadow-md font-medium text-lg p-5 mt-5 bg-white rounded-xl flex justify-between">
              Groups
              <Link href="/" className="text-blue-500">See more</Link>
            </div>

            <div className="shadow-md font-medium text-lg p-5 mt-5 bg-white rounded-xl flex justify-between">
              Photos
              <Link href="/" className="text-blue-500">See more</Link>
            </div>
            </div>
          </div>

            <div className="posts mt-10">
              {posts.map((post) => (
                <PostCard
                  key={post.postID}
                  username={post.username}
                  postDate={post.postDate}
                  postText={post.postContent}
                  imagePath=""
                  likes={post.likes}
                />))}
            </div>


        </div>

    </div>
    </>
    );
};