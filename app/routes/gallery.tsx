import { href, NavLink } from 'react-router'

export default function Gallery() {
	const obras = [
		{
			id: 1,
			title: 'Amanecer en calma',
			price: '$450',
			imageUrl: '/images/IpickedOneForU1.JPEG',
		},
		{
			id: 2,
			title: 'Horizontes azules',
			price: '$380',
			imageUrl: '/images/ReflectionOfASunset1.JPEG',
		},
		{
			id: 3,
			title: 'Mar profundo',
			price: '$520',
			imageUrl: '/images/IpickedOneForU1.JPEG',
		},
		{
			id: 4,
			title: 'Bosque encantado',
			price: '$490',
			imageUrl: '/images/ReflectionOfASunset1.JPEG',
		},
		{
			id: 5,
			title: 'Horizonte urbano',
			price: '$420',
			imageUrl: '/images/IpickedOneForU1.JPEG',
		},
		{
			id: 6,
			title: 'Luna plateada',
			price: '$350',
			imageUrl: '/images/ReflectionOfASunset1.JPEG',
		},
	]

	return (
		<div className="container mx-auto px-4">
			<h1 className="mb-8 font-sans text-2xl font-normal">Todas las Obras</h1>
			<div className="bg-background-alt mb-6 flex size-auto flex-wrap items-center gap-4 rounded-xl p-4">
				Filtrar por:
				<select className="bg-background rounded-full border px-4 py-2">
					<option>Colección</option>
				</select>
				<select className="bg-background rounded-full border px-4 py-2">
					<option>Precio</option>
				</select>
				<select className="bg-background rounded-full border px-4 py-2">
					<option>Técnica</option>
				</select>
			</div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
				{obras.map((obra) => (
					<NavLink
						to={href('/image')}
						key={obra.id}
						className="group border-painting-border bg-background-alt relative overflow-hidden rounded-lg border"
					>
						<div className="aspect-[4/3] w-full">
							<img
								src={obra.imageUrl}
								alt={obra.title}
								className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
							/>
						</div>
						<div className="p-4">
							<h3 className="text-foreground text-lg">{obra.title}</h3>
							<p className="text-foreground-alt">{obra.price}</p>
						</div>
					</NavLink>
				))}
			</div>
		</div>
	)
}
