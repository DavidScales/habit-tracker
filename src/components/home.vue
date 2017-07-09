/*
Represents the top level home view.
*/

<template lang=pug>
  #home
    h1 Projects
    ul(v-for='project in projects' :key='project.id')
      // temp TODO
      li(v-bind:style='{"background-color": project.color}')
        h2 {{project.title}}
        p note {{project.note}}
        p color {{project.color}}
        ul(v-for='task in project.tasks' :key='task.id')
          li
            h4 {{task.title}}
            p total time {{task.time}}
            p completed {{task.completed}}
            p note {{task.note}}
            ul(v-for='session in task.sessions' :key='session.id')
              li
                p date {{session.date}}
                p time {{session.end}} - {{session.start}} = {{session.end - session.start}}
        button(@click='editProject(project.id)') Edit project
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
      this.$router.push({name: 'project', params: {id: 'new'}});
    },
    editProject(id) {
      this.$router.push({name: 'project', params: {id: id}});
    }
  }
};
</script>

<style>

</style>
