import Vue from 'vue'
import App from './pages/App.vue'
import Main from './pages/categories/index.vue'
import Details from './pages/categories/_id.vue'
import Search from './pages/search.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Categories',
		component: Main,
		meta: {
			breadcrumb: [
				{
					text: 'All Categories',
					name: 'Categories'
				}
			]
		}
	},
	{
		path: '/category',
		name: 'Details',
		component: Details,
		meta: {
			breadcrumb: [
				{
					text: 'All Categories',
					name: 'Categories'
				},
				{
					text: 'Getting Started',
					name: 'Details'
				}
			]
		}
	},
	{
		path: '/search',
		name: 'Search',
		component: Search,
		meta: {
			breadcrumb: [
				{
					text: 'All Categories',
					name: 'Categories'
				}
				,
				{
					text: 'Search Results',
					name: 'Search'
				}
			]
		}
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

new Vue({
	el: '#app',
	render: h => h(App),
	router
});