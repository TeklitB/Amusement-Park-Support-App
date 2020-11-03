<!-- This file is to display an opened work log / task item from the list to read its full description-->
<template>
  <table class="container">
    <tr>
      <th class="left_col">
        <td class="column_format">
          <table style="width:95%">
            <tr>
              <td>
                <p class="h4 mb-2" style="color:white">
                  <b-icon icon="tools" style="color:white"></b-icon>
                  {{workLog.task}}
                </p>
              </td>
            </tr>
            <tr>
              <td><br>
                <p class="h4 mb-2" style="color:white">
                  <b-icon icon="file-text" style="color:white"></b-icon>
                  Description
                </p>
              </td>
            </tr>
            <tr style="height:300px;">
              <td class="text_box">
                {{workLog.description}}
              </td>
            </tr>
          </table>
        </td>
      </th>
      <th class="right_col">
        <td style="text-align:center" v-if="workLog.status === 'UNSTARTED' || workLog.status === 'STARTED'
                                          || workLog.status === 'PAUSED' || workLog.status === 'RESUMED'" class="column_format">
          <tr style="float:right">
            <td>
              <router-link :to="{name: 'WorkLogs'}">
                <b-button type="button" class="back_btn" href="/work-logs">
                  <b-icon icon="chevron-left" class="back_icon"></b-icon>
                </b-button>
              </router-link>
            </td>
          </tr>
          <div class="panelWrapper" style="text-align:center; width:100%; height:70%">
            <div v-if="workLog.status === 'UNSTARTED'" style="text-align:center; width:100%; height:70%">
              <h3>Task is not started</h3>
                <div style="margin-top:40%">
                  <b-button @click="startTask(); getWorkLogItem(id)" onClick="window.location.reload()"
                    type="button" class="toggle_btn" href="">
                    <b-icon icon="play-fill"></b-icon>
                  </b-button>
                </div>
            </div>
            <div v-else-if="workLog.status === 'STARTED'" style="text-align:center; width:100%; height:70%">
              <b-icon icon="clock-fill" style="width: 20px; height: 20px; color:#18dcf2"></b-icon><br/>
              <h3>Started at</h3>
              <p>{{workLog.startTime}}</p>
              <h3 class="resumed_status">RUNNING</h3>
              <div style="margin-top:10%">
                <b-button @click="pauseTask(); getWorkLogItem(id)" onClick="window.location.reload()"
                  type="button" class="toggle_btn" href="">
                  <b-icon icon="pause-fill"></b-icon>
                </b-button><br/><br/>
              </div>
              <b-button @click="completedTask(); getWorkLogItem(id)" onClick="window.location.reload()"
                type="button" class="done_btn">
                Done
              </b-button>
            </div>
            <div v-else-if="workLog.status === 'PAUSED'" style="text-align:center; width:100%; height:70%">
              <b-icon icon="clock-fill" style="width: 20px; height: 20px; color:#18dcf2"></b-icon><br/>
              <h3>Started at</h3>
              <p>{{workLog.startTime}}</p>
              <h3 class="paused_status">
                PAUSED
                <p style="font-size:20px">Paused at: {{getCurrentTimeOfPauseResumeAction()}}</p>
              </h3>
              <div style="margin-top:5.5%">
                <b-button @click="resumeTask(); getWorkLogItem(id)" onClick="window.location.reload()"
                  type="button" class="toggle_btn" href="">
                  <b-icon icon="play-fill"></b-icon>
                </b-button><br/><br/>
              </div>
              <b-button @click="completedTask(); getWorkLogItem(id)" onClick="window.location.reload()"
                type="button" class="done_btn">
                Done
              </b-button>
            </div>
            <div v-else-if="workLog.status === 'RESUMED'" style="text-align:center; width:100%; height:70%">
              <b-icon icon="clock-fill" style="width: 20px; height: 20px; color:#18dcf2"></b-icon><br/>
              <h3>Started at</h3>
              <p>{{workLog.startTime}}</p>
              <h3 class="resumed_status">
                RUNNING
                <p style="font-size:20px">Resumed at: {{getCurrentTimeOfPauseResumeAction()}}</p>
              </h3>
              <div style="margin-top:5.5%">
                <b-button @click="pauseTask(); getWorkLogItem(id)" onClick="window.location.reload()"
                  type="button" class="toggle_btn" href="">
                  <b-icon icon="pause-fill"></b-icon>
                </b-button><br/><br/>
              </div>
              <b-button @click="completedTask(); getWorkLogItem(id)" onClick="window.location.reload()"
                type="button" class="done_btn">
                Done
              </b-button>
            </div>
          </div>
        </td>
        <td v-if="workLog.status === 'COMPLETED' || (workLog.startTime !=='' && workLog.endTime !=='')" class="column_format">
          <tr style="float:right">
            <td>
              <router-link :to="{name: 'WorkLogs'}">
                <b-button type="button" class="back_btn" href="/work-logs">
                  <b-icon icon="chevron-left" class="back_icon"></b-icon>
                </b-button>
              </router-link>
            </td>
          </tr>
          <table class="time_panel" >
            <tr>
              <td><br>
                <p class="h4 mb-2" style="color:#1994d7">Time</p><br>
              </td>
            </tr>
            <tr>
              <td>
                <b-icon icon="stopwatch-fill" style="width: 80px; height: 80px; color:#18dcf2"></b-icon>
              </td>
            </tr><br>
            <tr>
              <td>
                <p class="h4 mb-2" style="color:#1994d7">
                  {{ getTimeString(workLog.startTime) }} - {{ getTimeString(workLog.endTime) }}
                </p>
              </td>
            </tr>
            <td class="timeline_panel" v-if="workLog.timeline.length>0">
              <tr style="background-color:blue; display:unset">
                <p class="h4 mb-2" style="color:white">Timeline</p>
              </tr>
              <div class="expandable" >
                <p class="start_event">
                  <b-icon icon="cone-striped"></b-icon>&emsp;
                  {{ getTimeString(workLog.startTime) }}&emsp;&emsp;STARTED
                </p>
                <ul class="timeline"  v-for="entry in workLog.timeline" :key="entry.id">
                  <li class="entry_style">{{getTimeString(entry.pausedAt)}}&emsp;&emsp;PAUSED</li>
                  <li v-if="entry.resumedAt" class="entry_style">
                    {{getTimeString(entry.resumedAt)}}&emsp;&emsp;RESUMED
                  </li>
                </ul>
                <p class="end_event">
                  <b-icon icon="cone-striped"></b-icon>&emsp;
                  {{ getTimeString(workLog.endTime) }}&emsp;&emsp;COMPLETED
                </p>
              </div>
            </td>
          </table>
        </td>
      </th>
    </tr>
  </table>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'ReadWorkLogItem',
  props: ['id'],
  data() {
    return {
      workLog: {
        task: ''
      },
      enableTimeLineView: false,
      enableTimeViewTextLabel: 'show'
    }
  },
  mounted() {
    this.getWorkLogItem(this.id)
  },
  methods: {
    getWorkLogItem(id) {
      Api.get(`worklog/${id}`)
        .then(response => {
          this.workLog = response.data
        })
        .catch(error => {
          this.workLog = undefined
          console.log(error)
        })
        .then(() => {
          // This code is always executed (after success or error).
        })
    },
    getTimeString(t) {
      if (!t) return null

      var time = new Date(Date.parse(t))
      var options = {
        hour: '2-digit', minute: '2-digit'
      }

      return time.toLocaleTimeString('sv-SE', options)
    },
    startTask() {
      var workLog = {
        _id: this.workLog._id,
        status: 'STARTED'
      }
      Api.patch('/worklog', workLog)
        .then(response => {
          console.log('success', response)
          // this.$router.push({ name: 'WorkLogs' })
        })
        .catch(error => {
          console.log(error)
        })
    },
    pauseTask() {
      var workLog = {
        _id: this.workLog._id,
        status: 'PAUSED'
      }
      Api.patch('/worklog', workLog)
        .then(response => {
          console.log('success', response)
          // this.$router.push({ name: 'WorkLogs' })
        })
        .catch(error => {
          console.log(error)
        })
    },
    resumeTask() {
      var workLog = {
        _id: this.workLog._id,
        status: 'RESUMED'
      }
      Api.patch('/worklog', workLog)
        .then(response => {
          console.log('success', response)
          // this.$router.push({ name: 'WorkLogs' })
        })
        .catch(error => {
          console.log(error)
        })
    },

    completedTask() {
      var workLog = {
        _id: this.workLog._id,
        status: 'COMPLETED'
      }
      Api.patch('/worklog', workLog)
        .then(response => {
          console.log('success', response)
          // this.$router.push({ name: 'WorkLogs' })
        })
        .catch(error => {
          console.log(error)
        })
    },
    getCurrentTimeOfPauseResumeAction() {
      var today = new Date()
      var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      return time
    },
    changeVisibility() {
      this.enableTimeLineView = !this.enableTimeLineView
      if (this.enableTimeLineView === true) { this.enableTimeViewTextLabel = 'Hide' } else { this.enableTimeViewTextLabel = 'Show' }
      return this.enableTimeLineView
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only-->
<style scoped>
.container{
  margin-top:9%;
  text-align:left;
  width:100%;
  min-height:500px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 10px 3px rgba(0,0,0,0.32);
  -moz-box-shadow: 0px 0px 10px 3px rgba(0,0,0,0.32);
  box-shadow: 0px 0px 10px 3px rgba(0,0,0,0.32);
}
.left_col{
  vertical-align: top;
  padding-top: 4%;
  padding-left:4%;
  width:60%;
  height:100%;
  background: rgb(25,148,215);
  background: linear-gradient(180deg, rgba(25,148,215,1) 0%, rgba(123,250,231,1) 100%);
  -webkit-border-top-left-radius: 10px;
  -webkit-border-bottom-left-radius: 10px;
  -moz-border-radius-topleft: 10px;
  -moz-border-radius-bottomleft: 10px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.right_col{
  vertical-align:top;
  padding-top: 1%;
  width:30%;
  height:100%;
  background-color:white;
  -webkit-border-top-right-radius: 10px;
  -webkit-border-bottom-right-radius: 10px;
  -moz-border-radius-topright: 10px;
  -moz-border-radius-bottomright: 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.column_format{
  display:block; box-sizing:border-box; clear:both;
}
.text_box{
  background-color:white;
  min-height:100%;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  vertical-align: top;
  padding-top: 4%;
  padding-left:4%;
}
.time_panel{
  width:100%;
  margin:0 auto;
  text-align:center;
}
.back_btn{
  float:right;
  background-color:transparent;
  border: 0px transparent;
}
.back_icon{
  width: 30px;
  height: 30px;
  color:#1994d7;
}
.panelWrapper{
  margin-top:20%;
  width:100%;
  height:100%;
}
.toggle_btn{
  display:inline-block;
  color: white;
  font-size:60px;
  width:80px;
  height:80px;
  background-color:#18dcf2;
  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
  border-radius: 100px;
  vertical-align:unset ;
  border: 0px transparent;
}
.done_btn{
  margin-top:4%;
  float:none;
  width: 80%;
  height: 55px;
  text-align: center;
  font-size:20px;
  color:white;
  background-color:#18dcf2;
  border:0px transparent;
  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
  border-radius: 100px;
  -webkit-box-shadow: 0px 0px 13px 0px rgba(0,0,0,0.71);
  -moz-box-shadow: 0px 0px 13px 0px rgba(0,0,0,0.71);
  box-shadow: 0px 0px 13px 0px rgba(0,0,0,0.71);
}
.b-icon.bi {
 font-size:inherit !important;
 /*vertical-align: unset !important;*/
}
.btn .b-icon.bi, .nav-link .b-icon.bi, .dropdown-toggle .b-icon.bi, .dropdown-item .b-icon.bi, .input-group-text .b-icon.bi {
    font-size: 125%;
    vertical-align: unset;
}
.paused_status{
  color:white;
  background: rgb(123,126,250);
  background: linear-gradient(270deg, rgba(123,126,250,1) 0%, rgba(168,25,215,1) 100%);
}
.resumed_status{
  color:white;
  background: rgb(213,250,231);
  background: linear-gradient(270deg, rgba(213,250,231,1) 0%, rgba(25,148,215,1) 100%);
  opacity: 1;
  animation: fadeInUp 1s ease-in-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
.timeline_panel{
 background-color: #1994d7;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
.start_event{
  width: 88%;
  margin-left: 6%;
  padding-top: 2%;
  margin-bottom: 2%;
  border-bottom: 2px dotted white;
  color: white;
  text-align: left;
}
.end_event{
  width: 88%;
  margin-left: 6%;
  padding-top: 2%;
  margin-bottom: 2%;
  border-top: 2px dotted white;
  color: white;
  text-align: left;
}
.list-group {
  margin-left:10%;
  text-align: left;
}
ul.timeline {
  list-style-type: none;
  position: relative;
  margin-top: 0;
  margin-bottom: 0;
}
ul.timeline:before {
  content: ' ';
  background: #d4d9df;
  display: inline-block;
  position: absolute;
  left: 29px;
  width: 2px;
  height: 100%;
  z-index: 400;
}
ul.timeline > li {
  margin: 0px 0;
  padding-left: 0px;
  margin-left: 5%;
}
ul.timeline > li:before {
  content: ' ';
  background: white;
  display: inline-block;
  position: absolute;
  border-radius: 50%;
  border: 3px solid #18dcf2;
  left: 5.5%;
  width: 20px;
  height: 20px;
  z-index: 400;
}
.expandable{
  overflow: auto; -webkit-box-shadow: inset 0px 8px 3px -3px rgba(0,0,0,0.3);
  -moz-box-shadow: inset 0px 8px 3px -3px rgba(0,0,0,0.3);
  box-shadow: inset 0px 8px 3px -3px rgba(0,0,0,0.3);
  -webkit-box-shadow: inset 0px 8px 3px -3px rgba(0,0,0,0.3);
  -moz-box-shadow: inset 0px 8px 3px -3px rgba(0,0,0,0.3);
  box-shadow: inset 0px 8px 3px -3px rgba(0,0,0,0.3);
  background-image: linear-gradient(45deg, #1ba9f6 25%, #1994d7 25%, #1994d7 50%, #1ba9f6 50%, #1ba9f6 75%, #1994d7 75%, #1994d7 100%);
  background-size: 56.57px 56.57px;
}
.entry_style{
  color: white;
  text-align: left;
  margin-left: 5%;
}
.toggle_timeline_btn{
  width:80%;
  background-color:#18dcf2;
  --webkit-border-radius: 100px;
  -moz-border-radius: 100px;
  border-radius: 100px;
  color:white;
  border: 0px transparent;
  font-size:20px;
}
.toggle_timeline_btn:hover{
background-color: #6c757d;
}
::-webkit-scrollbar {
  width: 5%;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: white;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: white;
}
</style>
