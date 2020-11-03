<!-- This component is to style and present data on one task list item for the list on the Tasks page  -->
<template>
  <li class="list-group-item" style=" background-color:transparent; border: 0px transparent">
    <table class="table_format">
      <tr>
        <th style = "width:10%; color: white; text-align:center; border-right: 4px solid #7bfae7" >
          {{task.priority}}
        </th>
        <th style = "width:10%; color: white; text-align:center;" >
          {{ task.title }}
        </th>
        <th class= "word_wrap" style="width:45%; color: white; border-left: 4px solid #7bfae7; padding-left:2%" >
          {{ getDescription(task.description) }}
        </th>
        <th style="width:5%; color: white">
          <router-link :to="{name: 'ReadTask', params: {id: task._id}}">
            <b-button type="button" style="background-color:transparent;border: 0px transparent" >
              <b-icon icon="chevron-right" style="width: 30px; height: 30px;color: white"></b-icon>
            </b-button>
          </router-link>
        </th>
      </tr>
    </table>
  </li>
</template>

<script>

export default {
  name: 'taskListItem',
  props: ['task'],
  methods: {
    getTimeString(t) {
      var time = new Date(Date.parse(t))
      var options = {
        hour: '2-digit', minute: '2-digit'
      }
      return time.toLocaleTimeString('sv-SE', options)
    },
    getDescription(workDescription) {
      const maxLenght = 100
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
.list_item_style{
  background-color: transparent;
  border: 0px transparent;
}
.table_format{
  text-align:left;
  width:100%;
  height:80px;
  background-image: linear-gradient(45deg, #1ba9f6 25%, #1994d7 25%, #1994d7 50%, #1ba9f6 50%, #1ba9f6 75%, #1994d7 75%, #1994d7 100%);
  background-size: 56.57px 56.57px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  -webkit-box-shadow: 0px 1px 2px 2px rgba(0,0,0,0.21);
  -moz-box-shadow: 0px 1px 2px 2px rgba(0,0,0,0.21);
  box-shadow: 0px 1px 2px 2px rgba(0,0,0,0.21);
  table-layout: fixed;
}
.word_wrap{
  word-wrap:break-word;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
