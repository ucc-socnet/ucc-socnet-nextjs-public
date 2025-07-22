'use server';

import { createSession} from './session_manager';
import { NextResponse } from 'next/server';

export async function POST(post: Request) {
	const body = await post.json();

	try {
		await createSession(body);
		console.log("Successfully created session");
		return NextResponse.json({ success: true });		
	} catch (error: unknown) {
		console.log("Error on session: ", error);
		return NextResponse.json({ success: false });		
	}
}