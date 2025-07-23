import styles from './styles.module.css'
import Image from 'next/image';
// import { useState } from 'react';

interface PostProps {
  username: string;
  postDate: string;
  postText: string;
  imagePath?: string;
  likes: number;
}

export default function Post({ username, postDate, postText, imagePath, likes}: PostProps) {
 return (
  <div className={styles.post}>
    <div className={styles.post_header}>
      <div className={styles.user_info}>
        <div className={styles.avatar}></div>
        <div className={styles.user_name}>
          <div className={styles.username}>{username}</div>
          <div className={styles.date}>{postDate}</div>
        </div>
      </div>
      <div className={styles.report}>Report</div>
    </div>

    <div className={styles.post_text}>{postText}</div>

    {imagePath && (
      <div className={styles.post_image}>
        <Image src={imagePath} alt="Post Image" />
      </div>
    )}

    <div className={styles.post_actions}>
      <span>
        <i className={styles.text_orange + " fas fa-circle"}></i> {likes}
      </span>
      <span>Like</span>
      <span>Comment</span>
    </div>
  </div>
);

}
