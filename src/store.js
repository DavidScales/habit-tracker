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
            timeCompleted: 4356789123, // Date.now()
            note: 'This is subtask 1, of X',
            sessions: [
              {
                // id: 1499558096623, // Date.now(),
                // date: '2017-07-08',
                start: 1499558096623, // Date.now()
                end: 1499558386486, // Date.now()
              },
              {
                // id: 1499558405566, // Date.now(),
                // date: '2017-07-08',
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
    createProject: (state, projectToSave) => {
      state.projects.push(projectToSave);
    },
    updateProject: (state, projectToSave) => {
      let id = projectToSave.id;
      let existingProjectIndex = findIndexById(state.projects, id);
      if (existingProjectIndex === -1) {return;};
      state.projects[existingProjectIndex] = projectToSave;
    },
    deleteProject: (state, id) => {
      let existingProjectIndex = findIndexById(state.projects, id);
      if (existingProjectIndex === -1) {return;}
      state.projects.splice(existingProjectIndex, 1);
    },
    updateTask: (state, payload) => {
      let taskToUpdate = payload.taskToUpdate;
      let taskId = taskToUpdate.id;
      let projectId = payload.projectId;
      let existingProjectIndex = findIndexById(state.projects, projectId);
      if (existingProjectIndex === -1) {return;}
      let project = state.projects[existingProjectIndex];
      let existingTaskIndex = findIndexById(project.tasks, taskId);
      if (existingTaskIndex === -1) {return;};
      project.tasks[existingTaskIndex] = taskToUpdate;
    },
    deleteTask: (state, ids) => {
      let taskId = ids.taskId;
      let projectId = ids.projectId;
      let existingProjectIndex = findIndexById(state.projects, projectId);
      if (existingProjectIndex === -1) {return;}
      let project = state.projects[existingProjectIndex];
      let existingTaskIndex = findIndexById(project.tasks, taskId);
      if (existingTaskIndex === -1) {return;}
      project.tasks.splice(existingTaskIndex, 1);
    },
  },
  getters: {
    getProjectById: (state, getters) => (id) => {
      return state.projects.find(project => project.id == id);
    },
    getTaskById: (state, getters) => (ids) => {
      let taskId = ids.taskId;
      let projectId = ids.projectId;
      let project = getters.getProjectById(projectId);
      if (!project) {return;}
      return project.tasks.find(task => task.id == taskId);
    }
  }

});

// Helper functions

function findIndexById(list, id) {
  let index = list.findIndex(item => {
    return item.id == id;
  });
  return index;
}
