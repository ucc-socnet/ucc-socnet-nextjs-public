'use client';
import style from './styles.module.css';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';

export default function Login() {
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const router = useRouter();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const res = await signInWithEmailAndPassword(gmail, password);
      console.log({ res });

      if (res?.user) {
        setPassword('');
        setErrorMsg('');
        router.push('/'); // Redirect after login
      }

    } catch (e) {
      console.error("Login error:", e);
      setErrorMsg("Login failed.");
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
            {error.message.substring(9)}
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