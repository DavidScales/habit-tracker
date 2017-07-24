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
            button(@click='editTask(task.id, project.id)') "Edit" task
            ul(v-for='session in task.sessions' :key='session.id')
              li
                p time {{session.end}} - {{session.start}} = {{parseInt((session.end - session.start) / 60000)}} min
        button(@click='editProject(project.id)') "Edit" project
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
      this.$router.push({name: 'project', params: {projectId: 'new'}});
    },
    editProject(projectId) {
      this.$router.push({name: 'project', params: {projectId: projectId}});
    },
    editTask(taskId, projectId) {
      this.$router.push({name: 'task', params: {
        taskId: taskId, projectId: projectId
      }});
    }
  }
};
</script>

<style>

</style>
