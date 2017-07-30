/*
Represents a task within a project.
*/

<template lang=pug>
  #task
    h1 Task: {{this.title}}
    p completed: {{this.completed}}
    p {{this.note}}
    p existing time on task: {{this.time}} minutes
    p session time: {{this.formattedTime}}
    button(@click='start') start
    button(@click='done') done
    button(@click='markComplete') task complete!
    button(@click='deleteTask') Delete task
</template>

<script>
export default {
  props: ['taskId', 'projectId'],
  data() {
    let ids = {taskId: this.taskId, projectId: this.projectId}
    let task = this.$store.getters.getTaskById(ids);
    if (!task) {
      // TODO add better error handling
      console.warn('No such task found!');
      this.$router.push({name: 'home'});
    }
    return {
      title: task.title,
      time: task.time,
      completed: task.completed,
      timeCompleted: null,
      note: task.note,
      sessions: task.sessions,
      sessionStart: null,
      sessionEnd: null,
      seconds: 0,
      minutes: 0,
      hours: 0,
      timeout: null
    };
  },
  computed: {
    formattedTime() {
      let hours = (this.hours > 9) ? this.hours : "0" + this.hours;
      let minutes = (this.minutes > 9) ? this.minutes : "0" + this.minutes;
      let seconds = (this.seconds > 9) ? this.seconds : "0" + this.seconds;
      return `${hours}:${minutes}:${seconds}`;
    }
  },
  methods: {
    markComplete() {
      this.completed = true;
      this.timeCompleted = Date.now();
      this.saveTask();
      this.$router.push({name: 'home'});
    },
    start() {
      this.sessionStart = Date.now();
      this.timer();
    },
    timer() {
      this.timeout = setTimeout(this.add, 1000);
    },
    add() {
      // setTimeout appears to slow when browser tab is not in focus
      // so using Date.now() to ensure accurate timekeeping
      let totalSeconds = Math.round((Date.now() - this.sessionStart) / 1000);
      this.hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      this.minutes = Math.floor(totalSeconds / 60);
      this.seconds = totalSeconds % 60;
      this.timer();
    },
    done() {
      clearTimeout(this.timeout);
      this.sessionEnd = Date.now();
      this.sessions.push({
        start: this.sessionStart,
        end: this.sessionEnd
      });
      this.time += this.minutes + this.hours * 60;
      this.saveTask();
      this.seconds = 0;
      this.minutes = 0;
      this.hours = 0;
    },
    saveTask() {
      // TODO add editing like in project
      let taskToUpdate = {
        id: this.taskId,
        title: this.title,
        time: this.time,
        completed: this.completed,
        timeCompleted: this.timeCompleted,
        note: this.note,
        sessions: this.sessions
      };
      this.$store.commit({
        type: 'updateTask',
        taskToUpdate: taskToUpdate,
        projectId: this.projectId
      })
    },
    deleteTask() {
      this.$store.commit({
        type: 'deleteTask',
        taskId: this.taskId,
        projectId: this.projectId
      });
      this.$router.push({name: 'home'});
    }
  }
};
</script>

<style>

</style>
