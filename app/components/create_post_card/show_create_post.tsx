'use client'
import { useState } from 'react';
import { db } from '@/firebase/config';
import { setDoc, doc } from 'firebase/firestore'
import styles from './styles.module.css'

export function ShowCreatePostCard({onCancel}) {

  const [postContent, setPostContent] = useState('');

  const handlePostUpload = async(event)=> {
    event.preventDefault();

    if (postContent == '') {
      alert('empty post');
      return;
    }

    // random post id generator
    let postId = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 20; i++) {
      const randomInd = Math.floor(Math.random() * characters.length);
      postId += characters.charAt(randomInd);
    }

    try {

      await setDoc(doc(db, "users_posts", postId), {
        username: "Username12982",
        userID: "9238402394asdfi2j",
        postContent: postContent
      });

      alert('Post created.');
      onCancel();

    } catch (error) {
      console.log('failed to upload the post to the server: ' + error.message);
      alert('failed to upload the post to the server: '  + error.message);
    }

  };

  function addImageArea() {
    const input_area = document.getElementById('text_input_container');
    const btn = document.getElementById('add_img_btn');

    if (document.getElementById('image-upload')) return;

    const label = document.createElement('label');
    label.className = styles.img_upload_container;

    const span = document.createElement('span');
    span.textContent = 'Choose an image to upload';

    const orText = document.createTextNode(' or ');

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.id = 'image-upload';
    input.name = 'post-image';
    input.required = true;
    input.className = 'post_image'

    label.setAttribute('for', input.id);
    label.appendChild(span);
    label.appendChild(orText);
    label.appendChild(input);

    input_area.appendChild(label);

    // btn.disabled = true;
    // btn.style.cursor = 'not-allowed';
  }

  return (
    <>
    <div className={styles.background_cover} id={styles.background_cover}></div>

    <form className={styles.create_post_card} id={styles.create_post_card_popup} onSubmit={handlePostUpload}>
    <div className={styles.user_info}>
      <div className={styles.avatar}></div>
      <div className={styles.username_date}>
        <div className={styles.username}>Username12982</div>
        <div className={styles.date}>On July 2, 2025 Thursday</div>
      </div>
    </div>

    <div className={styles.text_input_container} id="text_input_container">
      <textarea 
        className={styles.txt_area} 
        id={styles.txt_area} 
        value={postContent} 
        onChange={(e) => setPostContent(e.target.value)}
        name="postContent" 
        placeholder="What's on your mind?">
      </textarea>
  
    </div>

    <div className={styles.actions}>
      <button className={styles.button} id={styles.add_image_btn} onClick={addImageArea} type="button">Add Image</button>

      <div className={styles.post_controls}>
        <button className={styles.button} id={styles.cancel_post_btn} onClick={onCancel} type="button">Cancel</button>
        <input className={styles.button} id={styles.post_btn} type="submit" value="Create post"/>
      </div>
    </div>
    </form>
    </>
  );
}