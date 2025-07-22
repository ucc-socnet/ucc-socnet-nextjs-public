'use server';

import {createSession} from './session_manager';

export async function sessionHandler(userID: string) {
	try {
		const res = await createSession(userID);
		return { success: true, message: "Success" };		
	} catch (error: unknown) {
		return { success: false, message: "Failed to create session."};
	}
}