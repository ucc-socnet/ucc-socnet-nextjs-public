'use client'
import styles from './styles.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import { db } from '@/firebase/config';
// import { updateDoc, doc } from "firebase/firestore";

interface PostProps {
  postID: string;
  username: string;
  postDate: string;
  postText: string;
  imagePath?: string;
  likes: number;
  onLike: (id: string, likes: number)=>void;
  // onUserProfile: (uid: string)=>void;
  // isLiked: bool (this is for changing the font color when the user already liked the post);
}


export default function Post({ postID, username, postDate, postText, imagePath, likes, onLike}: PostProps) {

  // adjust the PostProps first (remove the onLike function)
  // function onLike() {
  //   const update = await fetch(`/api/get_posts?postID=${postID}&likes=${likes}`);
  // }

  const router = useRouter();

  // const onUserProfile = ()=> {
  //   router.replace(`/user_profile?username=${username}`);
  // };

 return (
  <div className={styles.post} id={postID}>
    <div className={styles.post_header}>
      <div className={styles.user_info}>
        <div className={styles.avatar}></div>
        <div className={`${styles.user_name} cursor-pointer`} onClick={ ()=>{ router.replace(`/user_profile?username=${username}`) }}>
          <div className={styles.username}>{username}</div>
          <div className={styles.date}>{postDate}</div>
        </div>
      </div>
      <div className={styles.report}>Report</div>
    </div>

    <div className={` text-sm sm:text-sm md:text-base md:w-auto lg:text-base ${styles.post_text}`}>{postText}</div>

    {imagePath && (
      <div className={styles.post_image}>
        <Image src={imagePath} alt="Post Image should be in here" />
      </div>
    )}

    <div className={styles.post_actions}>
      <span>
        <i className={styles.text_orange + " fas fa-circle"}></i> {likes}
      </span>
      <span className="cursor-pointer text-blue-500" onClick={()=>{onLike(postID, likes)}}>Like</span>
      <span className="cursor-pointer" onClick={()=>{onLike(postID, likes)}}>Comment</span>
    </div>
  </div>
);

}
