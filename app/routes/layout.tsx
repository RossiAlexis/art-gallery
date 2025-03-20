import { Link, Outlet } from 'react-router'

export default function Layout() {
	return (
		<div className="flex h-screen flex-grow flex-col">
			<main className="container mx-auto max-w-6xl flex-1 px-4 py-20">
				<Outlet />
			</main>
			<footer className="border-border mx-12 border-t py-6">
				<div className="container mx-auto px-4">
					<div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-600 md:flex-row">
						<div className="flex items-center gap-2">
							<span>© {new Date().getFullYear()} Art Gallery</span>
						</div>
						<nav className="flex gap-4">
							{/* <Link to="/contacto">Contacto</Link>
							<Link to="/sobre-mi">Sobre mí</Link>
							<Link to="/privacidad">Política de privacidad</Link> */}
						</nav>
					</div>
				</div>
			</footer>
		</div>
	)
}
