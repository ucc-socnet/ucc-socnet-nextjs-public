import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required.' }, { status: 400 });
    }

    const random_code = Math.floor(Math.random() * 900000) + 100000;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Account Verification Code",
      html: `<p>Here's your verification code: <strong>${random_code}</strong></p>`
    });

    return NextResponse.json({
      success: true,
      message: 'Verification email sent successfully',
      code: random_code // Optional: for dev purposes
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to send verification email.',
      error: error.message
    }, { status: 500 });
  }
}
