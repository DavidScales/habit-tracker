/*
This file contains the app's routing logic, using the vue-router library.
*/

// vue framework and vue-router library
import Vue from 'vue';
import VueRouter from 'vue-router';

// vue components represent the app's views
import Home from './components/home.vue';
import Project from './components/project.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'project',
      path: '/project/:id',
      component: Project,
      props: true
    },
    {
      name: 'home',
      path: '/',
      component: Home
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});
