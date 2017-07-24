/*
Represents a top level view for adding a new project.
*/

<template lang=pug>
  #project
    h1 New Project
    form(action='#' v-on:submit.prevent='saveProject')
      label(for='project-title') Title:
      input(type='text' name='project-title' value='' v-model='projectTitle')
      br
      label(for='project-color') Color:
      select(name='project-color' v-model='projectColor')
        option(disabled) select a color
        option red
        option blue
        option green
      br
      label(for='project-note') Note:
      textarea(name='project-note' rows='6' cols='40' v-model='projectNote')
      h4 Add some tasks:
      label(for='task-title') task:
      input(type='text' name='task-title' value='' v-model='taskTitle')
      br
      label(for='task-note') note:
      textarea(name='task-note' rows='2' cols='40' v-model='taskNote')
      button(@click.prevent='addTask') Add task
      ul(v-for='task in tasks' :key=task)
        li {{task.title}}: {{task.note}}
      br
      br
      button(type='submit') Save
    button(@click.prevent='deleteProject') Delete project
</template>

<script>
export default {
  props: ['projectId'],
  data() {
    if (this.projectId !== 'new') {
      let project = this.$store.getters.getProjectById(this.projectId);
      if (project) {
        return {
          projectTitle: project.title,
          projectColor: project.color,
          projectNote: project.note,
          taskTitle: '',
          taskNote: '',
          tasks: project.tasks,
          isNew: false
        };
      }
    }
    return {
      projectTitle: '',
      projectColor: '',
      projectNote: '',
      taskTitle: '',
      taskNote: '',
      tasks: [],
      isNew: true
    };
  },
  methods: {
    addTask() {
      let taskTitle = this.taskTitle && this.taskTitle.trim();
      let taskNote = this.taskNote && this.taskNote.trim();
      if (!taskTitle) {return;}
      let newTask = {
        id: Date.now(),
        title: taskTitle,
        time: 0,
        completed: false,
        note: taskNote,
        sessions: []
      }
      this.tasks.push(newTask);
      this.taskTitle = '';
      this.taskNote = '';
    },
    saveProject() {
      let projectTitle = this.projectTitle && this.projectTitle.trim();
      let projectColor = this.projectColor && this.projectColor.trim();
      let projectNote = this.projectNote && this.projectNote.trim();
      if (!(projectTitle && projectColor)) {return;}
      let projectToSave = {
        id: this.isNew ? Date.now() : this.projectId,
        title: projectTitle,
        note: projectNote,
        color: projectColor,
        tasks: this.tasks
      };
      if (this.isNew) {
        this.$store.commit('createProject', projectToSave);
      } else {
        this.$store.commit('updateProject', projectToSave);
      }
      this.$router.push({name: 'home'});
    },
    deleteProject() {
      this.$store.commit('deleteProject', this.projectId);
      this.$router.push({name: 'home'});
    }
  }
};
</script>

<style>

</style>
