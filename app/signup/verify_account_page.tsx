import style from './styles.module.css';
import nodemailer from 'nodemailer';

export default function Signup() {
  if (req.method === 'POST') {

    const email = req.body;
    const random_code = Math.floor(Math.random() * 999999);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    try {
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Account verification",
        text: `"Here's your verification code: ${random_code}"`
      });

      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send email.', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }


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
