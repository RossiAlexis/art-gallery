import { createCookieSessionStorage } from 'react-router'

type SessionData = {
	userId: string
}

type SessionFlashData = {
	error: string
}

const { getSession, commitSession, destroySession } =
	createCookieSessionStorage<SessionData, SessionFlashData>({
		cookie: {
			name: '__session',
			sameSite: 'lax',
			httpOnly: true,
			maxAge: 60,
			path: '/',
			//ToDo: Add the secret key to the .env file
			secrets: ['s3cret1'],
			secure: true,
		},
	})

export { getSession, commitSession, destroySession }
