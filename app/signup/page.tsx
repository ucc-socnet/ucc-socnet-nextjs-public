'use client';
import style from './styles.module.css';
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, db } from '@/firebase/config';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);

  const router = useRouter();
  const [createUserWithEmailAndPassword, error] = useCreateUserWithEmailAndPassword(auth);
  console.log(error);

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await fetch('/api/send-verification-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: gmail })
      });

      const data = await res.json();
      if (res.ok) {
        alert(`'Verification code sent to your email ${data.code}'`);
        setIsVerificationCodeSent(true);
      } else {
        alert('Failed to send verification code: ' + data.message);
      }
    } catch (e) {
      console.error("Signup error:", e);
    }
  };

  const handleVerification = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const isExist = await getDoc(doc(db, "usernames", username));
      if (isExist.exists()) {
        alert('Usernmae is already used');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(gmail, password);
      if (userCredential == null) return;

      const userId = userCredential.user.uid;
      setPassword('');

      await setDoc(doc(db, "usernames", username), {
        email: gmail,
        userID: userId
      });

      router.replace('/');
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      alert('Verification failed: ' + message);
    }
  };

  return (
    <div className={style.container}>
      <form onSubmit={isVerificationCodeSent ? handleVerification : handleSignUp} className={style.login_box}>
        <h1>Sign up to UCC Social Network</h1>

        <input type="text" placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input type="email" placeholder="Email address"
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
          required
        />

        <input type="password" placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {isVerificationCodeSent && (
          <input type="text" placeholder="Verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
        )}

        <button type="submit">{isVerificationCodeSent ? 'Verify' : 'Sign up'}</button>

        <div className={style.links}>
          <a href="/forgot-password/">Forgot password</a>
          <a href="/login">Log in</a>
        </div>

        {/*{error && <center><p style={{ color: 'red' }}>{error.message}</p></center>}*/}
      </form>
    </div>
  );
}
