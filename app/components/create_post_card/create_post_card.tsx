import styles from './styles.module.css'
import { useState } from 'react';
import { ShowCreatePostCard } from './show_create_post.tsx'

export default function CreatePostCard() {

  const [showCreatePostCard, setShowCreatePostCard] = useState(false);

  function onCancel() {
    const cover = document.getElementById(styles.background_cover);
    const form = document.getElementById(styles.create_post_card_popup);
    setShowCreatePostCard(false);

    cover?.remove();
    form?.remove();
  }

  // random bs becasuse of eslint
  const _handleClick = () => {
    onCancel();
  };

  function handleCreatePostCard() {
    setShowCreatePostCard(prev => !prev);
  }

	return (
  <>
	<div className={styles.create_post_card}>
    <div className={styles.user_input}>
    	<div className={styles.avatar}></div>
    	<div className={styles.button} id={styles.create_post_button} onClick={()=>{setShowCreatePostCard(true)}}>Share your thoughts</div>
    </div>
    <div className={styles.add_media} onClick={handleCreatePostCard}>
    	<i className="fa-solid fa-image"></i>Add image/video
    </div>
  </div>

  {showCreatePostCard && <ShowCreatePostCard onCancel={()=>{setShowCreatePostCard(false)}}/>}
  </>

	);
}