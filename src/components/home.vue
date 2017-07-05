/*
Represents the top level home view.
*/

<template lang=pug>
  #home
    h1 Projects
    ul(v-for='project in projects' :key='project.id')
      li
        h2 {{project.title}}
        ul(v-for='task in project.tasks' :key='task.id')
          li {{task.task}}
    button(@click='addProject') Add project
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    projects() {
      return this.$store.state.projects || {};
    }
  },
  methods: {
    addProject() {
      this.$router.push({name: 'project'});
    },
    // editProject() {
    //   this.$router.push({name: 'project', params: {}});
    // }
  }
};
</script>

<style>

</style>
