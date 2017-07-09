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
      /* e.g.
      {
        id: 1, // Date.now(),
        title: 'Project X',
        note: 'This is project X',
        color: 'blue',
        tasks: [
          {
            id: 11, // Date.now()
            title: 'subtask 1X',
            time: 30, // minutes,
            completed: false,
            // dateCompleted: '2017-07-08',
            note: 'This is subtask 1, of X',
            sessions: [
              {
                id: 1499558096623, // Date.now(),
                date: '2017-07-08',
                start: 1499558096623, // Date.now()
                end: 1499558386486, // Date.now()
              },
              {
                id: 1499558405566, // Date.now(),
                date: '2017-07-08',
                start: 1499558405566, // Date.now()
                end: 1499558438437, // Date.now()
              }
            ]
          }
        ]
      }
      */
    ]
  },
  // mutations are used to modify app state (synchronously)
  mutations: {
    saveProject: (state, projectToSave) => {
      let existingProjectIndex = state.projects.findIndex(project => {
        return project.id === projectToSave.id;
      });

      if (existingProjectIndex === -1) {
        state.projects.push(projectToSave);
      } else {
        state.projects[existingProjectIndex] = projectToSave;
      }
    },
    deleteProject: (state, id) => {
      let existingProjectIndex = state.projects.findIndex(project => {
        return project.id === id;
      });
      if (existingProjectIndex !== -1) {
        state.projects.splice(existingProjectIndex, 1);
      };
    }
  },
  getters: {
    getProjectById: (state, getters) => (id) => {
      return state.projects.find(project => project.id === id);
    }
  }

});
