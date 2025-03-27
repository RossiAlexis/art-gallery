import {
	data,
	Form,
	href,
	isRouteErrorResponse,
	Link,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from 'react-router'

import type { Route } from './+types/root'
import './styles/index.css'
import { getSession } from './utils/sessions.server'
import { Button } from './components/ui/button'

export const links: Route.LinksFunction = () => [
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'anonymous',
	},
]

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

export async function loader({ request }: Route.LoaderArgs) {
	const session = await getSession(request.headers.get('Cookie'))

	// if (session.has('userId')) {
	// 	// The user is already login
	// 	return redirect('/')
	// }

	return data({
		isUserLoggedIn: session.has('userId'),
	})
}

export default function App({ loaderData }: Route.ComponentProps) {
	const { isUserLoggedIn } = loaderData
	return (
		<>
			<header className="fixed flex h-14 w-full items-center justify-between bg-white px-4 md:px-16">
				<span className="font-display text-text-primary text-xl uppercase md:text-2xl">
					Art Gallery
				</span>
				<nav>
					<ul className="font-body text-text-primary flex gap-2 text-sm md:gap-4 md:text-base">
						{!isUserLoggedIn && (
							<>
								<Link to={href('/login')}>Login</Link>
								<Link to={href('/signup')}>Sign Up</Link>
							</>
						)}
						{isUserLoggedIn && (
							<div className="flex items-center gap-4">
								<Link to={href('/')}>Dashboard</Link>
								<Link to={href('/signup')}>Admin</Link>
								<Form action="/logout" method="POST">
									<Button variant="link" type="submit">
										Log Out
									</Button>
								</Form>
							</div>
						)}
						{/* 	<li>Collecciones</li>
						<li>Sobre Mi</li> */}
					</ul>
				</nav>
			</header>
			<Outlet />
		</>
	)
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = 'Oops!'
	let details = 'An unexpected error occurred.'
	let stack: string | undefined

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? '404' : 'Error'
		details =
			error.status === 404
				? 'The requested page could not be found.'
				: error.statusText || details
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message
		stack = error.stack
	}

	return (
		<main className="container mx-auto p-4 pt-16">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className="w-full overflow-x-auto p-4">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	)
}
