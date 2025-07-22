'use server';

import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const cookieHeader = req.headers.get('cookie');

  if (!cookieHeader) {
    return NextResponse.json({ error: 'No cookies sent' }, { status: 400 });
  }

  const token = cookieHeader
    .split('; ')
    .find(c => c.startsWith('session='))
    ?.split('=')[1];

  if (!token) {
    return NextResponse.json({ error: 'Session token not found' }, { status: 401 });
  }

  // Optional: verify token
  const secretKey = process.env.SESSION_SECRET_KEY;
  const encodedKey = new TextEncoder().encode(secretKey);

  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    });

    return NextResponse.json(payload);
  } catch (e) {
    return NextResponse.json({ error: `'Invalid token': ${e}` }, { status: 403 });
  }
}
