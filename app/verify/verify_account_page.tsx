import style from './styles.module.css';
import nodemailer from 'nodemailer';

export default function Signup() {
  return (
    <div className={style.container}>
      <form onSubmit={handleSignUp} className={style.login_box}>
        <h1>Verify your account</h1>

        <input name="username" type="text" placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <button type="submit">Verify</button>

        <div className={style.links}>
          <a href="/forgot-password/">Forgot password</a>
          <a href="/login">Log in</a>
        </div>

        {error && <center><p style={{ color: 'red' }}>{error.message.substring(9, error.message.length)}</p></center>}
      </form>
    </div>
  );
}
