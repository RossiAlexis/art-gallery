import { Form, redirect } from 'react-router'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import type { Route } from './+types/signup'
import { prisma } from '~/utils/db.server'
import bcrypt from 'bcryptjs'

const signupSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
})
export async function action({ request }: Route.ActionArgs) {
	const data = Object.fromEntries(await request.formData())

	const schemaValidation = signupSchema.safeParse(data)

	if (!schemaValidation.success) {
		console.log('Error validating schema', schemaValidation.error.errors)
		return
	}
	const { email, password } = schemaValidation.data
	const userExist = await prisma.user.findFirst({
		where: { email },
	})
	if (userExist) {
		// Return an error here
		console.log('User already exists')
		return
	}

	const encryptedPassword = await bcrypt.hash(password, 10)

	const user = await prisma.user.create({
		data: {
			email,
			password: encryptedPassword,
			username: email.slice(0, email.indexOf('@')),
		},
	})

	if (!user) {
		// Return an error here
		console.log('Error creating user')
		return
	}
	return redirect('/login')
}

export default function SignUp() {
	return (
		<div className="bg-background-alt m-auto flex h-80 flex-col items-center justify-center rounded-xl px-4">
			<h1 className="pb-8 text-2xl">Sign Up Form</h1>
			<Form method="POST" className="flex flex-col gap-4">
				<div className="mb-4 flex min-w-64 flex-col gap-1">
					<Label htmlFor="email" className="py-1">
						Email
					</Label>
					<Input id="email" name="email" placeholder="Email" />
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
