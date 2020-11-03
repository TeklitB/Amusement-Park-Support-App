<!-- This is the Work Log page to list all the logged tasks -->
<template>
  <div class="workLogs" style="margin-top:5%">
    <table style="width:100%">
      <tr>
        <th>
          <b-icon icon="stopwatch-fill" style="width: 80px; height: 80px; color:#18dcf2"></b-icon>
        </th>
      </tr>
      <tr>
        <th style="float:right">
          <b-button style="color:#18dcf2" type="button" class="add_button float-right"
            @click="addNewWorkLog()" href="/AddTaskForm">
            <b-icon icon="plus-circle"></b-icon>
            Add New
          </b-button>
        </th>
      </tr>
    </table>
    <div class="list_header">
      <div class="col1">
        <p class="h4 mb-2" style="color:#1994d7">
          <b-icon icon="watch" style="color:1994d7"></b-icon>
          Time
        </p>
      </div>
      <div class="col2">
        <p class="h4 mb-2" style="color:#1994d7">
          <b-icon icon="exclamation-diamond-fill" style="color:1994d7"></b-icon>
          Priority
        </p>
      </div>
      <div class="col3">
        <p class="h4 mb-2" style="color:#1994d7">
          <b-icon icon="tools" style="color:1994d7"></b-icon>
          Task
        </p>
      </div>
      <div class="col4">
        <p class="h4 mb-2" style="color:#1994d7">
          <b-icon icon="file-text" style="color:1994d7"></b-icon>
          Description
        </p>
      </div>
      <div class="line"></div>
    </div>

    <!-- Show this message if there is no data to show yet, otherwise make it disappear -->
    <h3 style="color:#1994D7">
      <p v-if="workLogs.length==0">
        <br />Your worklog list is empty.
        <br />Click to
        <b-icon icon="plus-circle" style="color:#1994D7"></b-icon>
        Add New
      </p>
    </h3>

    <!-- Create a work log list item when there is data by calling the WorkLogItem component, the styling is also done -->
    <b-list-group class="list-group" v-sortable="{ onUpdate: onUpdate }">
      <work-log-item v-for="workLog in workLogs"
        :key="workLog._id"
        :workLog="workLog">
      </work-log-item>
    </b-list-group>
  </div>
</template>

<script>
import { Api } from '@/Api'
import WorkLogItem from '@/components/WorkLogItem'

export default {
  name: 'WorkLogs',
  data() {
    return {
      workLogs: []
    }
  },
  mounted() {
    this.getWorkLogs()
  },
  methods: {
    getWorkLogs() {
      Api.get('worklog')
        .then(response => {
          this.workLogs = response.data.workLogs
        })
        .catch(error => {
          this.workLogs = []
          console.log(error)
        })
    },
    onUpdate(event) {
      this.workLogs.splice(
        event.newIndex,
        0,
        this.workLogs.splice(event.oldIndex, 1)[0]
      )
      var logs = this.workLogs
      Api.patch(`/worklog/${logs}`, logs)
        .then(response => {
          this.workLogs = response.data.workLogs
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  components: {
    WorkLogItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.workLogs {
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 2em;
}
.add_button {
  font-size: 35px;
  background-color: transparent;
  border-color: transparent;
}
.list_header {
  margin: 0 auto;
  width: 96%;
  text-align: left;
}
.line {
  width: 100%;
  height: 5px;
  background-color: #1994d7;
  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
  border-radius: 100px;
}
.col1 {
  display: inline-block;
  width: 13%;
  text-align: left;
}
.col2 {
  display: inline-block;
  width: 13%;
  text-align: left;
}
.col3 {
  display: inline-block;
  width: 13%;
  text-align: left;
}
.col4 {
  display: inline-block;
  width: 40%;
  text-align: left;
}
</style>
