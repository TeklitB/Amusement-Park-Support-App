<!-- This file is to display an opened task item from the list to read its full description before clicking "Assign" button-->
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
                  {{workLog.title}}
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
              <td class="text_box">{{workLog.description}}</td></tr>
          </table>
        </td>
      </th>
      <th class="right_col">
        <td class="column_format">
          <tr style="float:right">
            <td>
              <router-link :to="{name: 'Tasks'}">
                <b-button type="button" class="back_btn" href="/tasks">
                  <b-icon icon="chevron-left" class="back_icon"></b-icon>
                </b-button>
              </router-link>
            </td>
          </tr>
          <table class="time_panel">
            <tr>
              <td>
                <b-icon icon="tools" style="width: 80px; height: 80px; color:#18dcf2"></b-icon>
              </td>
            </tr>
            <tr>
              <td>
                <h5>Do you want to assign this task?</h5>
              </td>
            </tr><br>
            <tr>
              <td>
                <router-link :to="{name: 'WorkLogs'}">
                  <b-button type="button" class="assign_btn" href="/WorkLogs" @click="assignTask">
                    <p style="margin-top:3% !important; font-size:20px">Assign</p>
                  </b-button>
                </router-link>
              </td>
            </tr>
          </table>
        </td>
      </th>
    </tr>
  </table>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'ReadTask',
  props: ['id'],
  data() {
    return {
      workLog: {
        task: ''
      }
    }
  },
  mounted() {
    this.getWorkLogItem(this.id)
  },
  methods: {
    getWorkLogItem(id) {
      Api.get(`tasklist/${id}`)
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
      var time = new Date(Date.parse(t))
      var options = {
        hour: '2-digit', minute: '2-digit'
      }
      return time.toLocaleTimeString('sv-SE', options)
    },
    assignTask() {
      var workLog = {
        _id: this.workLog._id,
        status: 'TAKEN',
        title: this.workLog.title,
        description: this.workLog.description,
        startTime: '',
        endTime: '',
        priority: this.workLog.priority
      }
      Api.patch('/tasklist', workLog)
        .then(response => {
          console.log('success', response)
          // this.$router.push({ name: 'WorkLogs' })
        })
        .catch(error => {
          console.log(error)
        })
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
  background-image: linear-gradient(45deg, #1ba9f6 25%, #1994d7 25%, #1994d7 50%, #1ba9f6 50%, #1ba9f6 75%, #1994d7 75%, #1994d7 100%);
background-size: 56.57px 56.57px;
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
  height:400px;
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
.assign_btn{
  float: none;
  width: 80%;
  height: 55px;
  text-align: center;
  font-size: 20px;
  color: white;
  background-color:#18dcf2;
  border: 0px transparent;
  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
  border-radius: 100px;
  -webkit-box-shadow: 0px 1px 2px 2px rgba(0,0,0,0.21);
  -moz-box-shadow: 0px 1px 2px 2px rgba(0,0,0,0.21);
  box-shadow: 0px 1px 2px 2px rgba(0,0,0,0.21);
  font-size:inherit !important;
  vertical-align: unset !important;
}
</style>
