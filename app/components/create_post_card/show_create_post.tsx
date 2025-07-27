// 'use client'

import { useState, useEffect, useRef } from 'react';
import { db } from '@/firebase/config';
import { setDoc, doc } from 'firebase/firestore'
import styles from './styles.module.css'

export function ShowCreatePostCard( {onCancel}: { onCancel: () => void }) {

  const [postContent, setPostContent] = useState('');
  const [username, setUsername] = useState('');
  const [userID, setUserID] = useState('');
  const [current_date, setCurrent_Date] = useState('');

  const txtAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const txtArea = txtAreaRef.current;
    if (!txtArea) return;

    const resize = () => {
      txtArea.style.height = 'auto'; // reset first
      txtArea.style.height = `${txtArea.scrollHeight}px`;
    };

    resize(); // initial resize if there's default content
    txtArea.addEventListener('keydown', resize);

    return () => txtArea.removeEventListener('input', resize);
  }, []);

  useEffect(()=> {
    async function fetchSession() {
      try {
        const res = await fetch('/api/get_session', { method: 'POST' });
        const data = await res.json();
        console.log("Session payload:", data);
        setUsername(data.username);
        setUserID(data.userID);
      } catch (error) {
        console.log(`error on getting session: ${error}`);
      }
    }

    fetchSession();

    setCurrent_Date(new Date().toISOString());
  }, []);

  const handlePostUpload = async(event: React.FormEvent<HTMLFormElement>)=> {
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

    await setDoc(doc(db, "users_posts", postId), {
      username: username,
      userID: userID,
      postContent: postContent,
      date_posted: current_date,
    });

    alert('Post created.');
    onCancel();
  };

  function addImageArea() {
    // const btn = document.getElementById('add_img_btn');

    const input_area = document.getElementById('text_input_container');
    if (input_area == null) return;
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
        <div className={styles.username}>{username}</div>
        <div className={styles.date}>{current_date}</div>
      </div>
    </div>

    <div className={styles.text_input_container} id="text_input_container">
      <textarea 
        className={styles.txt_area} 
        id="txt_area" 
        value={postContent} 
        onChange={(e) => setPostContent(e.target.value)}
        name="postContent" 
        rows={7}
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