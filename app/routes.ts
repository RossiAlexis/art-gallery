import {
	type RouteConfig,
	index,
	layout,
	route,
} from '@react-router/dev/routes'

export default [
	layout('./routes/layout.tsx', [
		index('routes/home.tsx'),
		route('gallery', './routes/gallery.tsx'),
		route('image', './routes/image.tsx'),
		route('login', './routes/auth/login.tsx'),
		route('signup', './routes/auth/signup.tsx'),
	]),
] satisfies RouteConfig
