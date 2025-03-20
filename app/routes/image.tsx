export default function ImageDetail() {
	return (
		<div className="container flex w-full items-center justify-center px-4 py-8">
			{/* <h1 className="mb-8 font-sans text-2xl font-normal">Detalle de la Obra</h1>
            <div className="bg-background-alt mb-6 flex size-auto flex-wrap items-center gap-4 rounded-xl p-4">
                Obra destacada
            </div> */}
			<div className="flex gap-8">
				<div className="bg-background-alt h-[500px] min-w-96 flex-1 rounded-xl p-4 md:w-full">
					<img
						src="/images/ReflectionOfASunset1.JPEG"
						className="h-full w-full object-cover"
						alt="Obra destacada"
					/>
				</div>
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-5 border-b pb-8">
						<h2 className="font-playfair text-4xl">Reflejo de un atardecer</h2>
						<span className="text-foreground font-sans text-3xl">$450</span>
					</div>
					<div className="flex flex-col gap-4">
						<span className="font-playfair text-2xl">Detalles</span>
						<span className="font-playfair text-foreground-alt text-xl">
							Tecnica: Oleo sobre Lienzo
						</span>
						<span className="font-playfair text-foreground-alt text-xl">
							Dimensiones: 60 x 80
						</span>
						<span className="font-playfair text-foreground-alt text-xl">
							Año: 2023
						</span>
						<span className="font-playfair text-foreground-alt text-xl">
							Collecion: Abstracciones
						</span>
						<span className="font-playfair text-xl">Descripcion</span>
						<span className="font-playfair text-foreground-alt text-xl">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
							doloremque hic cupiditate. Illum illo quae a fugit, corporis
							accusamus error? Perspiciatis recusandae obcaecati quibusdam
							veritatis iusto tempora, totam dolorem minima.
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}
