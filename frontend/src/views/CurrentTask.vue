<!-- This file is to display an opened work log item from the list to read its full description-->
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
                  get task title data
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
              <td class="text_box">get task decription data</td>
            </tr>
          </table>
        </td>
      </th>
      <th class="right_col">
        <td class="column_format">
          <tr style="float:right ">
            <td>
              <router-link :to="{name: 'WorkLogs'}">
                <b-button type="button" class="back_btn" href="/work-logs">
                  <b-icon icon="chevron-left" class="back_icon"></b-icon>
                </b-button>
              </router-link>
            </td>
          </tr>
          <table class="right_panel">
            <start-task-panel :task="currentTasks"></start-task-panel>
          </table>
        </td>
      </th>
    </tr>
  </table>
</template>

<script>
import { Api } from '@/Api'
import StartTaskPanel from '@/components/StartTaskPanel'

export default {
  name: 'CurrentTask',
  data() {
    return {
      currentTasks: []
    }
  },
  mounted() {
    // this.getStartTaskPanel()
  },
  methods: {
    getStartTaskPanel() {
      Api.get('CurrentTask')
        .then(response => {
          this.currentTask = response.data.currentTask
        })
        .catch(error => {
          this.currentTask = []
          console.log(error)
        })
        .then(() => {
          // This code is always executed (after success or error).
        })
    }
  },
  components: {
    StartTaskPanel
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only-->
<style scoped>
.container{
  margin-top:10%;
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
.right_panel{
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
    text-align: center;
    font-size: 20px;
    color: white;
    background-color: #18dcf2;
    border: 0px transparent;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    border-radius: 100px;
    -webkit-box-shadow: 0px 0px 13px 0px rgba(0,0,0,0.71);
    -moz-box-shadow: 0px 0px 13px 0px rgba(0,0,0,0.71);
    box-shadow: 0px 0px 13px 0px rgba(0,0,0,0.71);
}
</style>
