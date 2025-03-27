import {
	type RouteConfig,
	index,
	layout,
	route,
} from '@react-router/dev/routes'

export default [
	layout('./routes/layout.tsx', [
		index('./routes/gallery.tsx'),
		route('image', './routes/image.tsx'),
		route('login', './routes/auth/login.tsx'),
		route('signup', './routes/auth/signup.tsx'),
		route('logout', './routes/auth/logout.tsx'),
		route('artist/:artistId', './routes/artist/dashboard.tsx'),
	]),
] satisfies RouteConfig
