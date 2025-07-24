import { useState, useEffect } from 'react'; 
import PostCard from "./components/post_card/post_card";

export function DisplayPosts() {
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

	const post_cards = posts.map((data) => (
	<PostCard
	  key={data.postID}
	  username={data.username}
	  postDate={data.postDate}
	  postText={data.postContent}
	  imagePath=""
	  likes={data.likes}
	/>));

	return post_cards;
}