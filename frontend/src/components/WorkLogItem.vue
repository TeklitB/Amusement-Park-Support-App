<!-- This component is to style and present data on one list item for the list on the Work Log page  -->
<template>
  <b-list-group-item class="list_item_style">
    <table class="static" v-bind:class="{ 'table_format': !isATask(workLog), 'task_item_style': isATask(workLog)}">
      <tr>
        <th style="width:2%">
        </th>
        <th style = " width: 10%; color:white">
          {{(workLog.status === 'UNSTARTED' || workLog.status === 'STARTED' || workLog.status === 'PAUSED' || workLog.status === 'RESUMED')
          ? getStatus(workLog.status)
          : getTimeStartEndString(workLog.startTime, workLog.endTime)}}
        </th>
        <th style = "width:10%; color:white" > {{ workLog.priority }}</th>
        <th style = "width:10%; color:white" > {{ workLog.task }}</th>
        <th class= "word_wrap" style="width:45%; color:white">
          {{ getDescription(workLog.description) }}
        </th>
        <th style="width:5%; color:white">
          <router-link :to="{name: 'ReadWorkLogItem', params: {id: workLog._id}}">
            <b-button type="button" style="background-color:transparent;border: 0px transparent" >
              <b-icon icon="chevron-right" style="width: 30px; height: 30px;color:white "></b-icon>
            </b-button>
          </router-link>
        </th>
      </tr>
    </table>
  </b-list-group-item>
</template>

<script>
export default {
  name: 'workLog-item',
  props: ['workLog'],
  methods: {
    isATask(workLog) {
      return workLog.endTime === ''
    },
    getTimeString(t) {
      var time = new Date(Date.parse(t))
      var options = {
        hour: '2-digit', minute: '2-digit'
      }
      return time.toLocaleTimeString('sv-SE', options)
    },
    getTimeStartEndString(startTime, endTime) {
      var start = new Date(Date.parse(startTime))
      var end = new Date(Date.parse(endTime))
      var options = {
        hour: '2-digit',
        minute: '2-digit'
      }
      return start.toLocaleTimeString('sv-SE', options) +
          ' - ' + end.toLocaleTimeString('sv-SE', options)
    },
    getStatus(statusKey) {
      var status = ''
      if (statusKey === 'UNSTARTED') {
        status = 'Unstarted'
      } else if (statusKey === 'STARTED') {
        status = 'In Progress'
      } else if (statusKey === 'PAUSED') {
        status = 'Paused'
      } else if (statusKey === 'RESUMED') {
        status = 'In Progress'
      } else if (statusKey === 'COMPLETED') {
        status = 'Completed'
      }
      return status
    },
    getDescription(workDescription) {
      const maxLenght = 70
      const description = workDescription.length < maxLenght
        ? workDescription
        : workDescription.slice(0, maxLenght)

      return description
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only-->
<style scoped>
.delete_icon{
  background-color:transparent;
  border: 0px transparent;
  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
  border-radius: 100px;
  color:white;
  width: 2%;
  }
.list_item_style{
  background-color: transparent;
  border: 0px transparent;
}
.table_format{
  text-align:left;
  width:100%;
  height:80px;
  background: rgb(24,220,242);
  background: linear-gradient(270deg, rgba(24,220,242,1) 0%, rgba(25,148,215,1) 100%);
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  table-layout: fixed;
  -webkit-box-shadow: 0px 1px 2px 2px rgba(0,0,0,0.21);
  -moz-box-shadow: 0px 1px 2px 2px rgba(0,0,0,0.21);
  box-shadow: 0px 1px 2px 2px rgba(0,0,0,0.21);
}
.task_item_style{
  text-align:left;
  width:100%;
  height:80px;
  background-image: linear-gradient(45deg, #1ba9f6 25%, #1994d7 25%, #1994d7 50%, #1ba9f6 50%, #1ba9f6 75%, #1994d7 75%, #1994d7 100%);
  background-size: 56.57px 56.57px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  table-layout: fixed;
  -webkit-box-shadow: 0px 1px 2px 2px rgba(0,0,0,0.21);
  -moz-box-shadow: 0px 1px 2px 2px rgba(0,0,0,0.21);
  box-shadow: 0px 1px 2px 2px rgba(0,0,0,0.21);
}
.word_wrap{
  word-wrap:break-word;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
