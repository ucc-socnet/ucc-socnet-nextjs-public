'use server'
import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { SessionPayload } from './session_payload';
// import Cookies from 'js-cookie';
// import jwt from 'jsonwebtoken';

const secretKey = process.env.SESSION_SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(payload: SessionPayload) {
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
	const session = await encrypt(payload);

	try {
	  const cookie = await cookies();
	  cookie.set('session', session, {
	    httpOnly: true,
	    secure: true,
	    path: '/',
	    sameSite: 'lax',
	    expires: expiresAt,
	  });
	} catch (e) {
	  console.error("Failed to set cookie:", e);
	}
}

export async function encrypt(payload: SessionPayload) {
	return new SignJWT(payload)
		.setProtectedHeader({alg: 'HS256'})
		.setIssuedAt()
		.setExpirationTime('7d')
		.sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
	try {

		const { payload } = await jwtVerify(session, encodedKey, { algorithms: ['HS256'] });
		console.log("decrypted payload:", JSON.stringify(session, null, 2));
		return payload;

	} catch (error) {
		console.log('Failed to verify the session: ', error);
	}
}