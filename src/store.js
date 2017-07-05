/*
This file contains the app's state & state logic, using the vuex library.
*/

// vue framework and vuex library. vuex-persistedstate adds local state persistence
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  // add persistent local storage
  plugins: [
    createPersistedState({
      key: 'vue-project-tracker', // local storage key
      paths: ['projects'] // specify partial state persistence
    })
  ],
  state: {
    projects: [
      {
        id: 1,
        title: 'Project X',
        tasks: [
          {id: 1, task: 'X1'}, {id: 2, task: 'X2'}, {id: 3, task: 'X3'}
        ]
      },
      {
        id: 2,
        title: 'Project Y',
        tasks: [
          {id: 1, task: 'Y1'}, {id: 2, task: 'Y2'}, {id: 3, task: 'Y3'}
        ]
      },
      {
        id: 3,
        title: 'Project Z',
        tasks: [
          {id: 1, task: 'Z1'}, {id: 2, task: 'Z2'}, {id: 3, task: 'Z3'}
        ]
      },
    ]
  },
  // mutations are used to modify app state (synchronously)
  mutations: {
    addProject(state, project) {
      state.projects.push(project);
    }
  }
});
