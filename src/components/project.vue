/*
Represents a top level view for adding a new project.
*/

<template lang=pug>
  #project
    h1 New project
    label(for='project-title') Project Title:
    input(type='text' name='project-title' value='' v-model='title')
    br
    h4 Tasks:
    label(for='task') Task:
    input(type='text' name='task' value='' v-model='newTask')
    button(@click='addTask') Add task
    ul(v-for='task in tasks' :key=task)
      li {{task}}
    button(@click='addProject') Save
</template>

<script>
export default {
  data() {
    return {
      title: '',
      newTask: '',
      tasks: []
    }
  },
  methods: {
    addTask() {
      let task = this.newTask && this.newTask.trim();
      if (!task) {return;}
      this.tasks.push(task);
      this.newTask = '';
    },
    addProject() {
      let newProject = {
        title: this.title,
        tasks: this.tasks.map(task => {
          return {
            id: Date.now(),
            task: task
          };
        })
      };
      this.$store.commit('addProject', newProject);
      this.$router.push({name: 'home'});
    }
  }
};
</script>

<style>

</style>
