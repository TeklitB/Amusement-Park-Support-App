<!-- This is the Tasks page to list all the incoming tasks -->
<template>
  <div class="taskLists" style="margin-top:5%">
    <table style="width:100%">
      <tr>
        <th>
          <b-icon icon="tools" style="width: 80px; height: 80px; color:#18dcf2"></b-icon>
        </th>
      </tr>
    </table>
    <ul class="list-group" v-sortable="{ onUpdate: onUpdate }">
      <task-list-item v-for="workLog in tasks" :key="workLog._id" :task="workLog">
      </task-list-item>
    </ul>
  </div>
</template>

<script>
import { Api } from '@/Api'
import TaskListItem from '@/components/TaskListItem'

export default {
  name: 'Tasks',
  data() {
    return {
      tasks: []
    }
  },
  mounted() {
    this.getWorkLogs()
  },
  methods: {
    getWorkLogs() {
      Api.get('tasklist')
        .then(reponse => {
          this.tasks = reponse.data.taskList
        })
        .catch(error => {
          this.tasks = []
          console.log(error)
        })
        .then(() => {
          // This code is always executed (after success or error).
        })
    },
    onUpdate(event) {
      this.tasks.splice(event.newIndex, 0, this.tasks.splice(event.oldIndex, 1)[0])
      var tasks = this.tasks
      Api.patch(`/tasklist/${tasks}`, tasks)
        .then(response => {
          this.tasks = response.data.taskList
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  components: {
    TaskListItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.taskLists {
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 2em;
}
.add_button {
  font-size: 35px;
  background-color: transparent;
  border-color:transparent;
}
.list_header{
  margin: 0 auto;
  width:97%;
}
.line{
  width:100%;
  height:5px;
  background-color:#1994d7;
  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
  border-radius: 100px;
}
.col1{
  display: inline-block;
  width:30%;
  text-align: left;
}
.col2{
  display: inline-block;
  width:15%;
  text-align: left;
}
.col3{
  display: inline-block;
  width:45%;
  text-align: left;
}
</style>
