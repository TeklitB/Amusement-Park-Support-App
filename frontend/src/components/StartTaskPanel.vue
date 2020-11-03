<!-- This component is to display the status panel for a task and toggling the Play/Pause-->
<template>
  <div class="panelWrapper">
    task state: {{taskState}}
    <div v-if="taskState === 'unStarted'" style="width:100%; height:70%">
      <h3>UNSTARTED</h3>
      <b-button @click="startTask()" type="button" class="btn" href="">
        <b-icon icon="play-fill"></b-icon>
      </b-button>
    </div>
    <div v-else-if="taskState === 'started'" style="text-align:center; width:100%; height:70%">
      <b-icon icon="clock-fill" style="width: 20px; height: 20px; color:#18dcf2"></b-icon><br/>
      <h3>Started at</h3>
      <p>startTime placeholder</p>
      <b-button @click="pauseTask()"  type="button" class="btn" href="">
        <b-icon icon="pause-fill"></b-icon>
      </b-button><br/><br/>
      <b-button type="button" class="done_btn">Done</b-button>
    </div>
    <div v-else-if="taskState === 'paused'"  style="text-align:center; width:100%; height:70%">
      <b-icon icon="clock-fill" style="width: 20px; height: 20px; color:#18dcf2"></b-icon><br/>
      <h3>Started at</h3>
      <p>startTime placeholder</p>
      <b-button @click="resumeTask()"  type="button" class="btn" href="">
        <b-icon icon="play-fill"></b-icon>
      </b-button><br/><br/>
      <b-button type="button" class="done_btn">Done</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'startTaskPanel',
  data() {
    return {
      taskState: 'unStarted' // buttonState can be unStarted, started, paused
    }
  },
  props: ['task'],
  methods: {
    startTask() {
      this.taskState = 'started'
    },
    pauseTask() {
      this.taskState = 'paused'
    },
    resumeTask() {
      this.taskState = 'started'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only-->
<style scoped>
.panelWrapper{
  width:100%;
  height:100%;
}
.btn{
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
 vertical-align: unset !important;
}
</style>
