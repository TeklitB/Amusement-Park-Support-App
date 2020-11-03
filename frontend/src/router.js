import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import WorkLogs from './views/WorkLogs.vue'
import ReadWorkLogItem from './views/ReadWorkLogItem.vue'
import AddTaskForm from './views/AddTaskForm.vue'
import Tasks from './views/Tasks.vue'
import ReadTask from './views/ReadTask.vue'
import CurrentTask from './views/CurrentTask.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/work-logs',
      name: 'WorkLogs',
      component: WorkLogs
    },
    {
      path: '/read-work-log-item/:id',
      name: 'ReadWorkLogItem',
      component: ReadWorkLogItem,
      props: true
    },
    {
      path: '/AddTaskForm',
      name: 'AddTaskForm',
      component: AddTaskForm
    },
    {
      path: '/Tasks',
      name: 'Tasks',
      component: Tasks
    },
    {
      path: '/ReadTask',
      name: 'ReadTask',
      component: ReadTask,
      props: true
    },
    {
      path: '/CurrentTask',
      name: 'CurrentTask',
      component: CurrentTask
    }
  ]
})
