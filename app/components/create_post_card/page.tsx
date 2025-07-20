import styles from './styles.module.css'

export default function CreatePostCard() {
	return (

	<div className={styles.create_post_card}>
        <div className={styles.user_input}>
        	<div className={styles.avatar}></div>
        	<div className={styles.button} id="create-post-button" onclick="showCreatePostMenu()">Share your thoughts</div>
        </div>
        <div className={styles.add_media} onclick="showCreatePostMenu()">
        	<i className="fa-solid fa-image"></i>Add image/video
        </div>
    </div>

	);
}