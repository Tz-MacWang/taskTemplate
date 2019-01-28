import VueRouter from "vue-router";

import Info from './info.vue'
import Edit from './edit.vue'
import Route from './route.vue'

const routes = [
  {
    path: '/',
    redirect: '/info',
    components: {
      stationaryTask: Info,
    },
    name: "任务模板",
    props: true,
  },
  {
    path: '/info',
    components: {
      stationaryTask: Info,
    },
    name: "固定任务",
    props: true,
  },
  {
    path: '/edit/:id',
    components: {
      stationaryTask: Edit,
    },
    name: "修改任务",
    props: true
  },
  {
    path: '/add',
    components: {
      stationaryTask: Edit,
    },
    name: "添加任务",
    props: true
  },
  {
    path: '/route',
    components: {
      stationaryTask: Route,
    },
    name: "送出路线",
    props: true
  },
  {
    path: '/route',
    components: {
      stationaryTask: Route,
    },
    name: "接收路线",
    props: true
  },
];


const router = new VueRouter({routes});

export {router};
