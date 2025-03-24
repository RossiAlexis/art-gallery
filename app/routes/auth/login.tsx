import { data, Form, redirect } from 'react-router'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { z } from 'zod'
import type { Route } from './+types/login'
import { prisma } from '~/utils/db.server'
import bcrypt from 'bcryptjs'
import { commitSession, getSession } from '~/utils/sessions.server'

export function meta() {
	return [{ title: 'Login' }]
}

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
})

export async function action({ request }: Route.ActionArgs) {
	const session = await getSession(request.headers.get('Cookie'))

	const data = Object.fromEntries(await request.formData())
	// Encrypt the password using bcrypt
	const { email, password } = loginSchema.parse(data)

	const user = await prisma.user.findUnique({
		where: { email },
	})
	if (!user) {
		// See how to return an error
		session.flash('error', 'Invalid email or password')
		return redirect('/login', {
			headers: {
				'Set-Cookie': await commitSession(session),
			},
		})
	}
	// Compare the password with the encrypted password
	const encryptedPassword = await bcrypt.hash(password, 10)

	const isValid = await bcrypt.compare(password, encryptedPassword)

	if (!isValid) {
		session.flash('error', 'Invalid email or password')
		return redirect('/login', {
			headers: {
				'Set-Cookie': await commitSession(session),
			},
		})
	}

	session.set('userId', user.id)

	return redirect('/', {
		headers: {
			'Set-Cookie': await commitSession(session),
		},
	})
}

export async function loader({ request }: Route.LoaderArgs) {
	const session = await getSession(request.headers.get('Cookie'))

	if (session.has('userId')) {
		// The user is already login
		return redirect('/')
	}
	return data(
		{ error: session.get('error') },
		{
			headers: {
				'Set-Cookie': await commitSession(session),
			},
		},
	)
}

export default function Login() {
	return (
		<div className="bg-background-alt m-auto flex h-80 flex-col items-center justify-center rounded-xl px-4">
			<h1 className="pb-8 text-2xl">Log In Form</h1>
			<Form method="POST" className="flex flex-col gap-4">
				<div className="mb-4 flex min-w-64 flex-col gap-1">
					<Label htmlFor="email" className="py-1">
						Email
					</Label>
					<Input id="email" placeholder="Email" name="email" />
				</div>
				<div className="flex min-w-64 flex-col gap-1">
					<Label htmlFor="password">Password</Label>
					<Input
						type="password"
						id="password"
						name="password"
						placeholder="Password"
					/>
				</div>
				<Button type="submit">Submit</Button>
			</Form>
		</div>
	)
}
