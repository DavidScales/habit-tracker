/*
This file is the starting point of the app.
*/

// import dependencies with webpack
import Vue from 'vue'; // vue is the front end framework
import router from './router'; // router contains the app's routing logic
import store from './store'; // store represents the app's state
import app from './components/app.vue'; // app.vue is the top level view of the app

// start & render app, passing in the store and router
new Vue({
  el: '#app',
  store: store,
  router: router,
  render: h => h(app)
});
