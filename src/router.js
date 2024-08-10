import Vue from 'vue'
import Router from 'vue-router'
import people from './views/people.vue'
import starships from './views/starships'
import films from './views/films'
import species from './views/species'
import vehicles from './views/vehicles'
import villagers from './views/villagers'
import Header from "@/components/header";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Header
    },
    {
      path: '/characters',
      name: 'characters',
      component: people
    },
    {
      path: '/films',
      name: 'films',
      component: films
    },
    {
      path: '/species',
      name: 'species',
      component: species
    },
    {
      path: '/vehicles',
      name: 'vehicles',
      component: vehicles
    },
    {
      path: '/starships',
      name: 'starships',
      component: starships
    },
    {
      path: '/villagers',
      name: 'villagers',
      component: villagers
    },
  ]
})
