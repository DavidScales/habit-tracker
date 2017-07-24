/*
This file contains the app's routing logic, using the vue-router library.
*/

// vue framework and vue-router library
import Vue from 'vue';
import VueRouter from 'vue-router';

// vue components represent the app's views
import Home from './components/home.vue';
import Project from './components/project.vue';
import Task from './components/task.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    },
    {
      name: 'project',
      path: '/project/:projectId',
      component: Project,
      props: true
    },
    {
      name: 'task',
      path: '/project/:projectId/task/:taskId',
      component: Task,
      props: true
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});
