import { destroySession, getSession } from '~/utils/sessions.server'
import type { Route } from './+types/logout'
import { redirect } from 'react-router'

export async function action({ request }: Route.ActionArgs) {
	const session = await getSession(request.headers.get('Cookie'))
	return redirect('/login', {
		headers: {
			'Set-Cookie': await destroySession(session),
		},
	})
}
