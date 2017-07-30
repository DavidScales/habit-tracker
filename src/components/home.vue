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
              span(v-if='task.completed') : {{formattedDate(task.timeCompleted)}}
            p note {{task.note}}
            button(@click='editTask(task.id, project.id)') "Edit" task
            ul(v-for='session in task.sessions' :key='session.id')
              li
                p
                  | session started {{formattedDate(session.start)}},
                  | time {{formattedTime(session.start)}} - {{formattedTime(session.end)}}
                  | ({{calculateMinutes(session.start, session.end)}} min)
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
    },
    formattedDate(timeInMs) {
      let date = new Date(timeInMs);
      let dd = date.getDate();
      let mm = date.getMonth() + 1; // January is 0
      let yyyy = date.getFullYear();
      dd = (dd < 10) ? '0' + dd : dd;
      mm = (mm < 10) ? '0' + mm : mm;
      return `${mm}/${dd}/${yyyy}`;
    },
    formattedTime(timeInMs) {
      let date = new Date(timeInMs);
      let mm = date.getMinutes();
      let hh = date.getHours();
      mm = (mm < 10) ? '0' + mm : mm;
      hh = (hh < 10) ? '0' + hh : hh;
      return `${hh}:${mm}`;
    },
    calculateMinutes(startTimeInMs, endTimeInMs) {
      return ((endTimeInMs - startTimeInMs) / 60000).toFixed(0);
    }
  }
};
</script>

<style>

</style>
