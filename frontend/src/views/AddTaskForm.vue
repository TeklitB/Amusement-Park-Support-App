<!-- This file is to display an input form for "Add New" work log item to the work log list -->
<template>
  <div>
    <table class="container">
      <tr>
        <th class="left_col">
          <td class="column_format">
            <div style ="width:95%; border-bottom: 4px solid white;">
              <b-icon icon="pencil" style="color:white; float_left; width:30px; height:30px;"></b-icon>
              <b-form-input v-model="task" placeholder="Title"
                style="width:90%; display:inline; border: 0px transparent;
                background-color:transparent; color:white; font-size:20px">
              </b-form-input>
            </div>
            <table style="width:95%">
              <tr>
                <td><br>
                  <p class="h4 mb-2" style="color:white">
                  <b-icon icon="info-circle-fill" style="color:white"></b-icon>Description
                  </p>
                </td>
              </tr>
              <tr style="height:300px;">
                <td class="text_box_wrapper">
                  <b-form-textarea id="textarea-no-resize" placeholder="Add description"
                    rows="10" no-resize class="text_box" v-model="description"
                    style="color:#1994d7;font-size:20px">
                  </b-form-textarea>
                </td>
              </tr>
            </table>
          </td>
        </th>
        <th class="right_col">
          <td class="column_format">
            <tr style="float:right">
              <td>
                <router-link :to="{name: 'WorkLogs'}">
                  <b-button type="button" class="back_btn">
                    <b-icon icon="x" class="back_icon">
                    </b-icon>
                  </b-button>
                </router-link>
              </td>
            </tr>
            <table class="time_panel">
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
                <td style="margin:0 auto ">
                  <p class="h4 mb-2" style="color:#1994d7"></p>
                  <div style=" align:center; display: inline-flex;">
                    <b-form-timepicker v-model="startTime" locale="sv-SE"></b-form-timepicker>
                    <b-form-timepicker v-model="endTime" locale="sv-SE"></b-form-timepicker>
                  </div>
                </td>
              </tr><br><br>
              <tr>
                <td>
                  <b-button type="button" class="save_btn" @click="createWorkLog">Save</b-button>
                </td>
              </tr>
            </table>
          </td>
        </th>
      </tr>
    </table>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'AddTaskForm',
  data() {
    return {
      addtaskform: [],
      errors: [],
      task: null,
      description: null,
      startTime: '00:00:00',
      endTime: '00:00:00',
      types: [
        'startTime',
        'endTime'
      ]
    }
  },
  methods: {
    checkForm: function (e) {
      if (this.task) {
        return true
      }
      this.errors = []
      if (!this.task) {
        this.errors.push('Title required.')
      }
      e.preventDefault()
    },
    createWorkLog() {
      var startTime = new Date()
      var endTime = new Date()

      startTime.setHours(this.startTime.split(':')[0], this.startTime.split(':')[1], this.startTime.split(':')[2])
      endTime.setHours(this.endTime.split(':')[0], this.endTime.split(':')[1], this.endTime.split(':')[2])
      var workLog = {
        task: this.task,
        description: this.description,
        startTime: startTime,
        endTime: endTime,
        timeline: []
      }
      Api.post('/worklog', workLog)
        .then(response => {
          console.log('success', response)
          this.$router.push({ name: 'WorkLogs' })
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  components: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
.text_box_wrapper{
  background-color:white;
  min-height:100%;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  vertical-align: top;
  padding-top: 4%;
  padding-left:4%;
}
.text_box{
  float:top;
  width:98%;
  border: 0px transparent;
  background-color: transparent;
  color:#1994d7;
}
.time_panel{
  width:100%;
  margin:0 auto;
  text-align:center;
}
.time_picker{
  background-color:transparent;
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
.col-sm-6 {
    -ms-flex: 0 0 50%;
    flex: 0 0 50%;
    max-width: 90%;
}
.save_btn{
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
  -webkit-box-shadow: 0px 1px 2px 2px rgba(0,0,0,0.21);
  -moz-box-shadow: 0px 1px 2px 2px rgba(0,0,0,0.21);
  box-shadow: 0px 1px 2px 2px rgba(0,0,0,0.21);
}
</style>
