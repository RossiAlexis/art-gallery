import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '~/components/ui/carousel'
import type { Route } from './+types/home'
import Autoplay from 'embla-carousel-autoplay'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'New React Router App' },
		{ name: 'description', content: 'Welcome to React Router!' },
	]
}

export default function Home() {
	return (
		<div className="flex h-full flex-1 flex-col items-center">
			<h2 className="mb-4 text-base">Obra destacada</h2>
			<div className="flex w-full max-w-xl justify-center px-2 md:px-4">
				<Carousel opts={{ loop: true }} plugins={[Autoplay()]}>
					<CarouselContent>
						<CarouselItem>
							<img
								src="/images/ReflectionOfASunset1.JPEG"
								className="max-h-[500px] w-full object-contain"
								alt="Obra destacada"
							/>
						</CarouselItem>
						<CarouselItem>
							<img
								src="/images/IpickedOneForU1.JPEG"
								className="max-h-[500px] w-full object-contain"
								alt="Obra destacada"
							/>
						</CarouselItem>
					</CarouselContent>
				</Carousel>
			</div>
		</div>
	)
}
