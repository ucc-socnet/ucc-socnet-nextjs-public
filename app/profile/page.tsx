'use client';
import styles from './styles.module.css';
import NavBar from '../components/navbar/navbar';
import PostCard from "../components/post_card/post_card"
import { useEffect, useState } from 'react';

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
            <div className={styles.profile_photo}></div>
        </div>

        <div className="flex">

            <div className={styles.about_me}>
              <h1 className="text-2xl">{username}</h1>
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