'use client';
import style from './styles.module.css';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import {sessionHandler} from './create_session';

export default function Login() {
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const router = useRouter();

  const [signInWithEmailAndPassword, _userCredential, _loading, error] = useSignInWithEmailAndPassword(auth);

  console.log(_userCredential);
  console.log(_loading);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await signInWithEmailAndPassword(gmail, password);
      // console.log({ res });

      if (res?.user) {
        setPassword('');
        setErrorMsg('');

        const userID: string = res.user.uid;
        const session_result = await sessionHandler(userID);

        if (session_result.success == false) {
          console.log("Error from sessionHandler: " + session_result.message);
          return;
        } else if (session_result.success) {
          console.log("Successfully created session");
          router.push('/'); // Redirect after login
        }

      }

    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      console.log('Login error: ' + message);
      alert('Login error: ' + message);
    }
  };

  return (
    <div className={style.container}>
      <form onSubmit={handleLogin} className={style.login_box}>
        <h1>Login to UCC Social Network</h1>

        <input name="gmail" type="email" placeholder="Email address"
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
          required
        />

        <input name="password" type="password" placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <div className={style.links}>
          <a href="/forgot-password/">Forgot password</a>
          <a href="/signup/">Create account</a>
        </div>

        {error && (
          <center><p style={{ color: 'red' }}>
            {error.message}
          </p></center>
        )}

        {errorMsg && (
          <center><p style={{ color: 'red' }}>
            {errorMsg}
          </p></center>
        )}
      </form>
    </div>
  );
}